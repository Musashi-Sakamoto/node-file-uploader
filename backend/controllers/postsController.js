const createError = require('http-errors');
const _ = require('lodash');
const Post = require('../models').post;
const User = require('../models').user;

const list = async (req, res, next) => {
  let posts;
  try {
    posts = await Post.findAll({
      where: {
        user_id: req.user.id
      }
    });
  }
  catch (error) {
    return next(new createError.InternalServerError('DB Error'));
  }
  res.json({
    posts
  });
};

const create = async (req, res, next) => {
  const {
    title,
    description
  } = req.body;

  if (title.trim().length === 0 || description.trim().length === 0) {
    return next(new createError.BadRequest('Title or Description should not be empty.'));
  }

  let post;
  try {
    post = await Post.create({
      title,
      description,
      user_id: req.user.id
    });
  }
  catch (error) {
    return next(new createError.InternalServerError('DB Error'));
  }
  return res.status(201).json({
    post
  });
};

const update = async (req, res, next) => {
  const {
    id,
    title,
    description
  } = req.body;
  const postData = {
    title,
    description
  };

  try {
    await Post.update(postData, {
      where: {
        id,
        user_id: req.user.id
      }
    });
  }
  catch (error) {
    return next(new createError.InternalServerError('DB Error'));
  }
};

module.exports = {
  create,
  list,
  update
};
