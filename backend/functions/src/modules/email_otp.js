'use strict';
const {randomInt, randomBytes, createHash, timingSafeEqual} = require('node:crypto');
const {AppError, requireThat} = require('../shared/policy');
const {transact} = require('../shared/transaction');
function hash(uid, nonce, code) { return createHash('sha256').update(`${uid}:${nonce}:${code}`).digest('hex'); }
function newChallenge(uid, old, now, code) {
  requireThat(!old || now - old.sentAt >= 60000, 'Vui lòng chờ 60 giây trước khi gửi lại.', 429);
  const day = Math.floor(now / 86400000), sent = old?.day === day ? old.sent : 0;
  requireThat(sent < 10, 'Đã đạt giới hạn 10 email trong ngày.', 429);
  const nonce = randomBytes(24).toString('hex');
  return {nonce, hash: hash(uid, nonce, code), expiresAt: now + 600000, sentAt: now, attempts: 0, day, sent: sent + 1, verified: false};
}
function checkChallenge(uid, challenge, code, now) {
  requireThat(challenge && challenge.expiresAt > now && challenge.attempts < 5 && !challenge.verified, 'Mã hết hạn, đã dùng hoặc bị khóa.');
  challenge.attempts++;
  const valid = /^\d{6}$/.test(code) && timingSafeEqual(Buffer.from(challenge.hash), Buffer.from(hash(uid, challenge.nonce, code)));
  if (valid) challenge.verified = true;
  return valid;
}
async function sendOtp(db, user, smtpUrl, from) {
  requireThat(!user.emailVerified, 'Email đã được xác minh.');
  requireThat(smtpUrl && from, 'Chưa cấu hình dịch vụ gửi email trên máy chủ.', 503);
  const code = String(randomInt(100000, 1000000)), now = Date.now(), ref = db.ref(`otp/${user.uid}`);
  await transact(ref, old => newChallenge(user.uid, old, now, code));
  try {
    await require('nodemailer').createTransport(smtpUrl).sendMail({from, to: user.email,
      subject: 'ShareMeal – Mã xác minh email', text: `Mã xác minh ShareMeal của bạn là ${code}. Mã có hiệu lực 10 phút. Không chia sẻ mã này.`});
  } catch (_) {
    throw new AppError('Không gửi được email. Hãy kiểm tra cấu hình SMTP và thử lại sau 60 giây.', 503);
  }
  return {sent: true};
}
async function verifyOtp(db, auth, user, code) {
  requireThat(typeof code === 'string', 'Mã xác minh không hợp lệ.');
  const ref = db.ref(`otp/${user.uid}`), now = Date.now();
  let valid = false;
  await transact(ref, challenge => { valid = checkChallenge(user.uid, challenge, code, now); return challenge; });
  requireThat(valid, 'Mã xác minh không đúng.');
  await auth.updateUser(user.uid, {emailVerified: true});
  return {verified: true};
}
module.exports = {newChallenge, checkChallenge, sendOtp, verifyOtp};
