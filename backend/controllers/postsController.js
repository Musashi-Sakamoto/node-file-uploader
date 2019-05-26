const createError = require('http-errors');
const _ = require('lodash');
const Post = require('../models').post;
const Image = require('../models').image;
const { deleteS3Object } = require('../utils/s3Control');


const { getS3SignedUrl } = require('../utils/s3Control');

const list = async (req, res, next) => {
  const { limit, offset } = req.query;
  console.log('====================================');
  console.log(`limit ${limit}, offset: ${offset}`);
  console.log('====================================');
  let newPosts;
  try {
    const postData = await Post.findAndCountAll({
      limit: Number(limit),
      offset: Number(offset),
      where: {
        user_id: req.user.id
      },
      order: [
        ['createdAt', 'DESC']
      ],
      include: [{
        model: Image,
        attributes: ['key']
      }]
    });
    newPosts = {};
    const posts = postData.rows;
    newPosts.rows = await Promise.all(posts.map(async (pos) => {
      const returnedValue = {
        id: pos.id,
        title: pos.title,
        description: pos.description,
        createdAt: pos.createdAt,
        updatedAt: pos.updatedAt,
        user_id: pos.user_id
      };
      if (pos.images.length > 0) {
        returnedValue.presignedUrl = await getS3SignedUrl(pos.images[0].key);
      }
      return returnedValue;
    }));
    newPosts.count = postData.count;
  }
  catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    return next(new createError.InternalServerError('DB Error'));
  }
  return res.status(200).json({
    posts: newPosts
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
      },
      include: [{
        model: Image,
        attributes: ['key']
      }]
    });
  }
  catch (error) {
    return next(new createError.InternalServerError('DB Error'));
  }
  if (!existingPost) {
    return next(new createError.BadRequest('Post not exits'));
  }

  try {
    if (existingPost.images.length > 0) {
      console.log(existingPost.images[0].key);

      await deleteS3Object(existingPost.images[0].key);
    }

    await Post.destroy({
      where: {
        id
      }
    });
  }
  catch (error) {
    console.log(error);

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
