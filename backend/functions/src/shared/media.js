'use strict';
const {requireThat} = require('./policy');

function mediaAt(root, path) {
  requireThat(typeof path === 'string' && path.length < 500 && !path.includes('..'), 'Đường dẫn file không hợp lệ.');
  const match = /^(food|documents)\/([\w-]{1,128})\/([\w-]{1,128})\.(jpg|jpeg|png|pdf)$/.exec(path);
  requireThat(match, 'Đường dẫn file không hợp lệ.');
  const record = root.media?.[match[2]]?.[match[3]];
  requireThat(record?.status === 'ready' && record.path === path && record.uid === match[2], 'File chưa tải lên hoàn tất hoặc không tồn tại.', 404);
  return record;
}
function ownedMedia(root, uid, path, folder) {
  const record = mediaAt(root, path);
  requireThat(record.uid === uid && record.folder === folder, 'File không thuộc tài khoản.', 403);
  return record;
}
module.exports = {mediaAt, ownedMedia};
