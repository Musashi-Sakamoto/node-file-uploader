const createError = require('http-errors');
const User = require('../models').user;
const Image = require('../models').image;
const VerificationToken = require('../models').verificationToken;
const { randomString, hashString } = require('../utils/stringUtil');
const { sendVerificationEmail } = require('../utils/sendEmail');
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
        email
      }
    });
    if (user !== null) {
      return next(new createError.Conflict('User already exists.'));
    }
  }
  catch (error) {
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
    return next(new createError.InternalServerError('DB Error [users create 3]'));
  }

  return res.status(201).json({
    user,
    password
  });
};

module.exports = {
  create,
  list
};
