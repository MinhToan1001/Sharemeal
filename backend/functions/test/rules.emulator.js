'use strict';
const {test, before, after, beforeEach} = require('node:test');
const {readFileSync} = require('node:fs');
const {initializeTestEnvironment, assertFails, assertSucceeds} = require('@firebase/rules-unit-testing');
const {ref, get, set} = require('firebase/database');
const {ref: storageRef, uploadBytes, getBytes} = require('firebase/storage');
let env;
before(async () => {
  env = await initializeTestEnvironment({projectId: 'demo-sharemeal', database: {rules: readFileSync('../firebase/database/database.rules.json', 'utf8')}, storage: {rules: readFileSync('../firebase/storage/storage.rules', 'utf8')}});
});
beforeEach(async () => {
  await env.clearDatabase();
  await env.withSecurityRulesDisabled(async context => set(ref(context.database()), {
    config: {adminUid: 'admin'}, users: {admin: {role:'admin'}, otherAdmin: {role:'admin'}, alice: {role:'donor'}, bob: {role:'charity'}, locked: {disabled:true}},
    views: {alice: {profile:{name:'Alice'}}, bob: {profile:{name:'Bob'}}, admin:{accounts:[]}, otherAdmin:{accounts:[]}, locked:{private:true}}, state:{codes:{secret:true}}, otp:{alice:{hash:'private'}}
  }));
});
after(async () => { await env.cleanup(); });
const auth = uid => env.authenticatedContext(uid, {email_verified:true});
test('anonymous and unverified users cannot read business snapshots', async () => {
  await assertFails(get(ref(env.unauthenticatedContext().database(), 'views/alice')));
  await assertFails(get(ref(env.authenticatedContext('alice', {email_verified:false}).database(), 'views/alice')));
});
test('user reads only own server projection', async () => {
  await assertSucceeds(get(ref(auth('alice').database(), 'views/alice')));
  await assertFails(get(ref(auth('alice').database(), 'views/bob')));
  await assertFails(get(ref(auth('alice').database())));
});
test('all direct writes, role escalation and private server state are denied', async () => {
  const db = auth('alice').database();
  for(const path of ['users/alice/role','config/adminUid','views/alice/foods','state/foods/new','otp/alice']) await assertFails(set(ref(db,path),'admin'));
  await assertFails(get(ref(db,'state'))); await assertFails(get(ref(db,'otp')));
});
test('only designated admin reads admin snapshot, disabled accounts lose reads', async () => {
  await assertSucceeds(get(ref(auth('admin').database(), 'views/admin')));
  await assertFails(get(ref(auth('otherAdmin').database(), 'views/otherAdmin')));
  await assertFails(get(ref(auth('locked').database(), 'views/locked')));
  await assertFails(set(ref(auth('admin').database(),'users/alice/role'),'admin'));
});
test('private storage accepts only own verified uploads and blocks direct downloads', async () => {
  const alice = auth('alice').storage(), bob = auth('bob').storage();
  await assertSucceeds(uploadBytes(storageRef(alice,'documents/alice/test.pdf'), Buffer.from('%PDF-test'), {contentType:'application/pdf'}));
  await assertFails(uploadBytes(storageRef(bob,'documents/alice/other.pdf'), Buffer.from('private'), {contentType:'application/pdf'}));
  await assertFails(getBytes(storageRef(alice,'documents/alice/test.pdf')));
  await assertFails(uploadBytes(storageRef(alice,'food/alice/script.html'), Buffer.from('<script/>'), {contentType:'text/html'}));
  await assertFails(uploadBytes(storageRef(env.unauthenticatedContext().storage(),'food/alice/no.jpg'), Buffer.from('a'), {contentType:'image/jpeg'}));
});
