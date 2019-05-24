const createError = require('http-errors');
const _ = require('lodash');
const Post = require('../models').post;
const Image = require('../models').image;

const list = async (req, res, next) => {
  const { limit, offset } = req.query;
  console.log('====================================');
  console.log(`limit ${limit}, offset: ${offset}`);
  console.log('====================================');
  let posts;
  try {
    posts = await Post.findAndCountAll({
      limit: Number(limit),
      offset: Number(offset),
      where: {
        user_id: req.user.id
      },
      order: [
        ['createdAt', 'DESC']
      ],
      include: [{
        model: Image
      }]
    });
  }
  catch (error) {
    return next(new createError.InternalServerError('DB Error'));
  }
  return res.status(200).json({
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
    id
  } = req.params;
  const {
    title,
    description
  } = req.body;
  const postData = {
    title,
    description
  };
  console.log('====================================');
  console.log(`${description}`);
  console.log('====================================');
  let existingPost;
  try {
    existingPost = await Post.findOne({
      where: {
        id
      }
    });
  }
  catch (error) {
    return next(new createError.InternalServerError('DB Error'));
  }
  if (!existingPost) {
    return next(new createError.BadRequest('Post not exits'));
  }

  console.log('====================================');
  console.log(`${id}, ${req.user.id}`);
  console.log('====================================');

  try {
    await existingPost.update(postData);
  }
  catch (error) {
    return next(new createError.InternalServerError('DB Error'));
  }

  return res.status(204).json({
    message: 'Accepted'
  });
};

const destroy = async (req, res, next) => {
  const {
    id
  } = req.params;

  let existingPost;
  try {
    existingPost = await Post.findOne({
      where: {
        id
      }
    });
  }
  catch (error) {
    return next(new createError.InternalServerError('DB Error'));
  }
  if (!existingPost) {
    return next(new createError.BadRequest('Post not exits'));
  }

  try {
    await Post.destroy({
      where: {
        id
      }
    });
  }
  catch (error) {
    return next(new createError.InternalServerError('DB Error'));
  }

  return res.status(204).json({
    message: 'Accepted'
  });
};

module.exports = {
  create,
  list,
  update,
  destroy
};
