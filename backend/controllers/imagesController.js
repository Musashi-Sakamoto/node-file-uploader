const util = require('util');
const createError = require('http-errors');
const _ = require('lodash');
const Image = require('../models').image;

const { upload } = require('../utils/s3Control');

const singleUpload = util.promisify(upload.single('image'));

const list = async (req, res, next) => {
  let images;
  try {
    images = await Image.findAll({
      where: {
        user_id: req.user.id
      }
    });
  }
  catch (error) {
    return next(new createError.InternalServerError('DB Error'));
  }
  res.json({
    images
  });
};

const imageUpload = async (req, res, next) => {
  try {
    await singleUpload(req, res);
  }
  catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    next(new createError.UnprocessableEntity('File is not accepted'));
    return;
  }
  console.log('====================================');
  console.log(req.file.originalname);
  console.log('====================================');
  if (!req.file) {
    next(new createError.BadRequest('File not uploaded.'));
    return;
  }
  let image;
  try {
    image = await Image.upsert({
      key: req.file.key,
      post_id: req.file.originalname
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
  imageUpload,
  list
};
