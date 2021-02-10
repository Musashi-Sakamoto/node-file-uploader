const createError = require('http-errors');
const User = require('../models').user;
const Image = require('../models').image;
const VerificationToken = require('../models').verificationToken;
const { randomString, hashString } = require('../utils/stringUtil');
const { sendVerificationEmail } = require('../utils/sendEmail');
const Sequelize = require('sequelize');

const { Op } = Sequelize;
/* GET users listing. */
const list = async (req, res, next) => {
  let users;
  try {
    users = await User.findAll({
      attributes: ['id', 'name']
    });
  }
  catch (error) {
    return next(new createError.InternalServerError('DB Error'));
  }
  return res.status(200).json({
    users
  });
};

const create = async (req, res, next) => {
  const {
    name,
    password,
    email
  } = req.body;

  if (name.trim().length === 0) {
    return next(new createError.BadRequest('Name not included.'));
  }

  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email },
          { name }
        ]
      }
    });
    if (user !== null) {
      return next(new createError.Conflict('User already exists.'));
    }
  }
  catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    return next(new createError.InternalServerError('DB Error [users create 1]'));
  }

  const hashedPassword = await hashString(password);

  let user;
  try {
    user = await User.create({
      name,
      email,
      password: hashedPassword
    });
  }
  catch (error) {
    return next(new createError.InternalServerError('DB Error [users create 2]'));
  }

  try {
    const hashedString = await hashString(randomString(16));
    const verificationToken = await VerificationToken.create({
      user_id: user.id,
      token: hashedString
    });
    await sendVerificationEmail(user.email, verificationToken.token);
  }
  catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    if (error.response) {
      console.error(error.response.body);
    }
    return next(new createError.InternalServerError('DB Error [users create 3]'));
  }

  return res.status(201).json({
    user,
    password
  });
};

const destroy = async (req, res, next) => {
  const {
    id
  } = req.params;

  let existingUser;
  try {
    existingUser = await User.findOne({
      where: {
        id
      }
    });
  }
  catch (error) {
    return next(new createError.InternalServerError('DB Error'));
  }
  if (!existingUser) {
    return next(new createError.BadRequest('User not exits'));
  }

  try {
    await User.destroy({
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
  destroy
};
