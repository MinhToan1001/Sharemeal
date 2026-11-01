'use strict';
// One-time admin setup. The secret stays in the ignored .private directory.
const fs = require('node:fs');
const path = require('node:path');
const cloudinary = require('../functions/node_modules/cloudinary').v2;
const secret = fs.readFileSync(path.join(__dirname, '../.private/cloudinary-api-secret'), 'utf8').trim();
cloudinary.config({cloud_name: 'toanvip', api_key: '919634828858254', api_secret: secret, secure: true});
const options = {
  name: 'sharemeal_demo_unsigned', unsigned: true, folder: 'sharemeal_demo',
  // Cloudinary presets do not support max_file_size. The app enforces 8 MB.
  allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
  unique_filename: true, use_filename: false, overwrite: false,
};
(async () => {
  let result;
  try { result = await cloudinary.api.create_upload_preset(options); }
  catch (e) {
    const failure = e.error || e;
    if (failure.http_code !== 409 && !String(failure.message).includes('already exists')) throw e;
    const {name, ...settings} = options;
    result = await cloudinary.api.update_upload_preset(name, settings);
  }
  const current = await cloudinary.api.upload_preset(options.name);
  console.log(JSON.stringify({name: current.name, unsigned: current.unsigned, settings: current.settings}));
})().catch(e => { console.error('Cloudinary setup failed:', (e.error || e).message); process.exitCode = 1; });
