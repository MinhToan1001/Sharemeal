'use strict';
const fs=require('node:fs'),path=require('node:path');
const cloudinary=require('../functions/node_modules/cloudinary').v2;
const manifest=path.join(__dirname,'../.private/android-created-media.json');
const secretPath=path.join(__dirname,'../.private/cloudinary-api-secret');
cloudinary.config({cloud_name:'toanvip',api_key:'919634828858254',api_secret:fs.readFileSync(secretPath,'utf8').trim(),secure:true});
(async()=>{
  if(!fs.existsSync(manifest)){console.log('No Android test media manifest');return;}
  const urls=JSON.parse(fs.readFileSync(manifest,'utf8'));
  let deleted=0;
  for(const url of new Set(urls)){
    const match=/^https:\/\/res\.cloudinary\.com\/toanvip\/image\/upload\/v\d+\/(sharemeal_demo\/[a-zA-Z0-9_-]+)\.(png|jpe?g)$/.exec(url);
    if(!match)throw Error('Unexpected media path; refusing deletion');
    const result=await cloudinary.uploader.destroy(match[1],{resource_type:'image',invalidate:true});
    if(!['ok','not found'].includes(result.result))throw Error('Unexpected Cloudinary deletion response');
    deleted++;
  }
  fs.writeFileSync(manifest,'[]\n');
  console.log(JSON.stringify({androidTestImagesCleaned:deleted}));
})().catch(e=>{console.error((e.error||e).message);process.exitCode=1;});
