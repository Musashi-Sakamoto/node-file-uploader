const router = require('express-promise-router')();
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
    const error = new Error();
    error.status = 400;
    error.message = 'name not included';
    return next(error);
  }

  try {
    const user = await User.findOne({
      where: {
        name
      }
    });
    if (user !== null) {
      const error = new Error();
      error.status = 400;
      error.message = 'User already exists.';
      return next(error);
    }
  }
  catch (error) {
    error.status = 500;
    error.message = 'DB Error';
    return next(error);
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
    error.status = 500;
    error.message = 'DB Error';
    return next(error);
  }
  return res.status(201).json({
    user,
    password
  });
};

module.exports = {
  create
};
