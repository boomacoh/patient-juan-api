const multer = require('multer');

const limits = { fileSize: 200 * 1024 * 1024 };
const fileFilter = (req, file, cb) => {
  if (file.mimetype !== 'image/png') return cb(new Error('File must be of type \'PNG\''), false);
  return cb(null, true);
}


const upload = multer({ fileFilter: fileFilter, limits: limits });

module.exports = upload;