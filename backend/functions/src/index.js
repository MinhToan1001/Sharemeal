'use strict';
const {initializeApp} = require('firebase-admin/app');
const {getAuth} = require('firebase-admin/auth');
const {getDatabase} = require('firebase-admin/database');
const {onRequest} = require('firebase-functions/v2/https');
const {onValueWritten} = require('firebase-functions/v2/database');
const {defineSecret, defineString} = require('firebase-functions/params');
const {randomInt} = require('node:crypto');
const {execute} = require('./engine');
const {project, rebuildViews} = require('./shared/projections');
const {AppError, requireThat, isAdmin, participant} = require('./shared/policy');
const {createUpload, completeUpload, downloadUrl} = require('./modules/cloudinary_media');
const {transact} = require('./shared/transaction');
const projectId = process.env.GCLOUD_PROJECT || 'sharemeal-e17c9';
initializeApp({projectId, databaseURL: `https://${projectId}-default-rtdb.firebaseio.com`});
const cloudinarySecret = defineSecret('CLOUDINARY_API_SECRET');
const cloudName = defineString('CLOUDINARY_CLOUD_NAME', {default:'toanvip'});
const cloudKey = defineString('CLOUDINARY_API_KEY', {default:'919634828858254'});
const mediaConfig = () => ({cloudName:cloudName.value(),apiKey:cloudKey.value(),apiSecret:cloudinarySecret.value()});
const region = 'us-central1';
exports.api = onRequest({region, secrets: [cloudinarySecret], maxInstances: 5, timeoutSeconds: 60, cors: false}, async (req, res) => {
  res.set('Cache-Control', 'no-store');
  try {
    requireThat(req.method === 'POST', 'Chỉ chấp nhận POST.', 405);
    requireThat(req.is('application/json') && Buffer.byteLength(JSON.stringify(req.body)) <= 100000, 'Nội dung yêu cầu không hợp lệ.');
    const bearer = /^Bearer (.+)$/.exec(req.get('Authorization') || '');
    requireThat(bearer, 'Cần đăng nhập.', 401);
    let token;
    try { token = await getAuth().verifyIdToken(bearer[1], true); }
    catch (_) { throw new AppError('Phiên đăng nhập không hợp lệ.', 401); }
    const user = await getAuth().getUser(token.uid), db = getDatabase();
    requireThat(!user.disabled, 'Tài khoản bị khóa.', 403);
    const {command, payload = {}, requestId} = req.body;
    requireThat(typeof command === 'string' && payload && typeof payload === 'object' && !Array.isArray(payload), 'Yêu cầu không hợp lệ.');
    const profile = (await db.ref(`users/${user.uid}`).get()).val();
    requireThat(!profile?.disabled, 'Tài khoản bị khóa.', 403);
    if (profile?.role === 'admin') requireThat((await db.ref('config/adminUid').get()).val() === user.uid, 'Tài khoản này không phải admin được chỉ định.', 403);
    let result = {};
    if (command === 'sendOtp' || command === 'verifyOtp') throw new AppError('Ứng dụng đã chuyển sang liên kết xác minh Firebase. Hãy dùng bản ứng dụng mới và mở liên kết trong email.', 409);
    else if (command === 'createUpload') result = await createUpload(db,user,profile,payload,requestId,mediaConfig(),projectId);
    else if (command === 'completeUpload') result = await completeUpload(db,user,payload,mediaConfig());
    else if (command === 'refresh') {
      await transact(db.ref(), root => { if (!root) return root; rebuildViews(root, Date.now()); return root; });
    } else if (command === 'fileUrl') {
      requireThat(typeof payload.path === 'string' && payload.path.length < 500 && !payload.path.includes('..'), 'Đường dẫn không hợp lệ.');
      const root = (await db.ref().get()).val() || {}, privileged = isAdmin(root, user.uid);
      const own = payload.path.startsWith(`documents/${user.uid}/`) || payload.path.startsWith(`food/${user.uid}/`);
      const view = project(root, user.uid);
      const food = (view.foods || []).some(f => f.photo === payload.path);
      const proof = Object.values(root.state?.orders || {}).some(o => participant(o, user.uid) && o.proof === payload.path);
      requireThat(user.emailVerified && (privileged || own || food || proof), 'Không được truy cập file này.', 403);
      result = {url:downloadUrl(root,payload.path,mediaConfig())};
    } else {
      const time = Date.now(), pin = String(randomInt(100000, 1000000));
      await transact(db.ref(), root => {
        const execution = execute(root, {uid: user.uid, email: user.email, emailVerified: user.emailVerified}, command, payload, requestId, time, pin);
        result = execution.result; return execution.root;
      });
    }
    if (result.error) throw new AppError(result.error);
    const stored = (await db.ref(`views/${user.uid}`).get()).val();
    const view = user.emailVerified ? stored || {profile: null} : {profile: stored?.profile || null};
    res.status(200).json({result, view});
  } catch (error) {
    // Never return stack traces, tokens, SMTP URLs or OTPs.
    res.status(error instanceof AppError ? error.status : 500).json({error: error instanceof AppError ? error.message : 'Máy chủ chưa xử lý được yêu cầu. Vui lòng thử lại.'});
  }
});
// Console edits (including singleton admin assignment) refresh read projections.
exports.syncAccountViews = onValueWritten({ref: '/users/{uid}/role', instance: `${projectId}-default-rtdb`, region, maxInstances: 2}, async event => {
  if (JSON.stringify(event.data.before.val()) === JSON.stringify(event.data.after.val())) return;
  const ref = getDatabase().ref();
  await transact(ref, root => { if (!root) return root; rebuildViews(root, Date.now()); return root; });
});
