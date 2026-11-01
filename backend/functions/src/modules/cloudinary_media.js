'use strict';
const {v2: cloudinary} = require('cloudinary');
const {AppError, requireThat, key} = require('../shared/policy');
const {transact} = require('../shared/transaction');
const {mediaAt} = require('../shared/media');
const MAX_BYTES = 8 * 1024 * 1024;
const MIME = {jpg:'image/jpeg', jpeg:'image/jpeg', png:'image/png', pdf:'application/pdf'};

function client(config) {
  requireThat(/^[\w-]+$/.test(config.cloudName || '') && /^\d+$/.test(config.apiKey || '') && config.apiSecret, 'Chưa cấu hình Cloudinary trên máy chủ.', 503);
  cloudinary.config({cloud_name:config.cloudName, api_key:config.apiKey, api_secret:config.apiSecret, secure:true, signature_algorithm:'sha256'});
  return cloudinary;
}
function signedUpload(record, config) {
  const sdk = client(config);
  const params = {timestamp:record.timestamp, public_id:record.publicId, type:'authenticated', overwrite:false,
    allowed_formats:record.extension === 'pdf' ? 'pdf' : 'jpg,jpeg,png'};
  return {id:record.id, path:record.path, mime:record.mime,
    uploadUrl:`https://api.cloudinary.com/v1_1/${config.cloudName}/${record.resourceType}/upload`,
    fields:{...params, api_key:config.apiKey, signature:sdk.utils.api_sign_request(params,config.apiSecret,'sha256')}};
}
async function createUpload(db, user, profile, payload, requestId, config, projectId) {
  client(config);
  requireThat(user.emailVerified && profile && !profile.disabled, 'Cần đăng nhập và xác minh email trước khi tải file.', 403);
  const {folder, extension, size} = payload;
  requireThat(['food','documents'].includes(folder) && Object.hasOwn(MIME,extension), 'Loại file không được hỗ trợ.');
  requireThat(folder !== 'food' || extension !== 'pdf', 'Ảnh món ăn cần JPG hoặc PNG.');
  if(folder === 'food') requireThat(profile.role === 'donor' && profile.verificationStatus === 'approved', 'Hồ sơ người cho chưa được duyệt.', 403);
  requireThat(Number.isSafeInteger(size) && size > 0 && size <= MAX_BYTES, 'File phải nhỏ hơn hoặc bằng 8 MB.');
  const id = key(requestId), ref = db.ref(`media/${user.uid}/${id}`), now = Date.now();
  let record = (await ref.get()).val();
  if(record) {
    requireThat(record.folder === folder && record.extension === extension && record.declaredSize === size && record.status === 'pending' && record.expiresAt > now, 'Yêu cầu tải file đã được sử dụng hoặc hết hạn.');
    return signedUpload(record,config);
  }
  await transact(db.ref(`mediaQuota/${user.uid}`), old => {
    const quota = old && now - old.startedAt < 3600000 ? old : {startedAt:now,count:0};
    requireThat(quota.count < 40, 'Đã đạt giới hạn 40 lần tải file mỗi giờ.', 429);
    quota.count++; return quota;
  });
  const path = `${folder}/${user.uid}/${id}.${extension}`;
  record = {id, uid:user.uid, folder, extension, path, mime:MIME[extension], declaredSize:size,
    resourceType:extension === 'pdf' ? 'raw' : 'image',
    publicId:`sharemeal/${projectId}/${folder}/${user.uid}/${id}${extension === 'pdf' ? '.pdf' : ''}`,
    timestamp:Math.floor(now/1000), expiresAt:now+900000, status:'pending'};
  await transact(ref, old => old || record);
  return signedUpload(record,config);
}
async function completeUpload(db, user, payload, config) {
  const id = key(payload.id), ref = db.ref(`media/${user.uid}/${id}`), record = (await ref.get()).val();
  requireThat(user.emailVerified && record?.uid === user.uid, 'Không có quyền hoàn tất file này.', 403);
  if(record.status === 'ready') return {path:record.path};
  requireThat(record.expiresAt > Date.now(), 'Phiên tải file đã hết hạn.');
  const sdk = client(config);
  let asset;
  try { asset = await sdk.api.resource(record.publicId,{resource_type:record.resourceType,type:'authenticated'}); }
  catch (_) { throw new AppError('Cloudinary chưa xác nhận file. Hãy thử tải lại.', 409); }
  requireThat(asset.public_id === record.publicId && asset.type === 'authenticated' && asset.resource_type === record.resourceType, 'File Cloudinary không khớp phiên tải.');
  requireThat(Number.isSafeInteger(asset.bytes) && asset.bytes > 0 && asset.bytes <= MAX_BYTES && asset.bytes === record.declaredSize, 'Kích thước file Cloudinary không hợp lệ.');
  if(record.resourceType === 'image') requireThat(['jpg','jpeg','png'].includes(asset.format), 'Định dạng ảnh không được hỗ trợ.');
  await ref.update({status:'ready', bytes:asset.bytes, assetId:asset.asset_id, version:asset.version, completedAt:new Date().toISOString(), format:asset.format || record.extension});
  return {path:record.path};
}
function downloadUrl(root, path, config) {
  const record = mediaAt(root,path), sdk = client(config);
  return sdk.utils.private_download_url(record.publicId,record.resourceType === 'raw' ? undefined : record.format,
    {resource_type:record.resourceType,type:'authenticated',expires_at:Math.floor(Date.now()/1000)+300,attachment:false});
}
module.exports = {createUpload, completeUpload, downloadUrl};
