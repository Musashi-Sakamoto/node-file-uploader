const util = require('util');
const createError = require('http-errors');

const upload = require('../utils/uploader');

const singleUpload = util.promisify(upload.single('image'));

const imageUpload = async (req, res, next) => {
  try {
    await singleUpload(req, res);
  }
  catch (error) {
    next(new createError.UnprocessableEntity('File is not accepted'));
    return;
  }
  if (!req.file) {
    next(new createError.BadRequest('File not uploaded.'));
    return;
  }
  res.json({
    imageUrl: req.file.location
  });
};

module.exports = {
  imageUpload
};
