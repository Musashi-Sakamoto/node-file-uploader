const router = require('express-promise-router')();
const createError = require('http-errors');
const User = require('../models').user;
const { randomString, hashString } = require('../utils/stringUtil');
/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json({ users: [{ name: 'Timmy' }] });
});

const create = async (req, res, next) => {
  const {
    name
  } = req.body;

  if (name.trim().length === 0) {
    return next(new createError.BadRequest('Name not included.'));
  }

  try {
    const user = await User.findOne({
      where: {
        name
      }
    });
    if (user !== null) {
      return next(new createError.BadRequest('User already exists.'));
    }
  }
  catch (error) {
    return next(new createError.InternalServerError('DB Error'));
  }

  const password = randomString(8);
  const hashedPassword = await hashString(password);

  let user;
  try {
    user = await User.create({
      name,
      password: hashedPassword
    });
  }
  catch (error) {
    return next(new createError.InternalServerError('DB Error'));
  }
  return res.status(201).json({
    user,
    password
  });
};

module.exports = {
  create
};