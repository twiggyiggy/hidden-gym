const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dygs6mymv',
  api_key: '566328748912286',
  api_secret: '48m31-IvFePtxuGErxL4GpyHstY'
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'name folder',
  allowedFormats: ['jpg', 'png']
});

const parser = multer({ storage: storage });

module.exports = parser
;
