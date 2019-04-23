const util = require('util');
const createError = require('http-errors');
const Image = require('../models').image;

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
  const imageUrl = req.file.location;
  let image;
  try {
    image = await Image.create({
      url: imageUrl,
      name: req.file.originalname,
      user_id: req.user.id
    });
  }
  catch (error) {
    next(new createError.InternalServerError('DB Error'));
    return;
  }
  res.json({
    image
  });
};

module.exports = {
  imageUpload
};
