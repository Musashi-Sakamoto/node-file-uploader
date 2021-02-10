const jwt = require('jsonwebtoken');
const passport = require('passport');
const Redis = require('ioredis');
const createError = require('http-errors');
const User = require('../models').user;
const VerificationToken = require('../models').verificationToken;

const redis = new Redis(
  process.env.REDIS_ENDPOINT
);

const login = async (req, res, next) => {
  passport.authenticate('local', { session: false }, async (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return next(new createError.BadRequest(info.message));
    }
    req.login(user, {
      session: false
    }, async (err2) => {
      if (err2) {
        return next(err2);
      }
      const token = jwt.sign(user, 'secret', {
        expiresIn: '15h'
      });

      let loginUser;
      try {
        loginUser = await User.findOne({
          attributes: ['id', 'name', 'email'],
          where: {
            name: user.name
          }
        });
        await redis.set(loginUser.id, token, 'ex', 60 * 60 * 15);
      }
      catch (error) {
        return next(new createError.InternalServerError('DB Error'));
      }

      return res.status(200).json({
        user: loginUser,
        message: info.message,
        token
      });
    });
  })(req, res);
};

const logout = async (req, res, next) => {
  try {
    await redis.del(req.user.id);
  }
  catch (error) {
    console.log(error);
  }
  req.logout();
  return res.status(200).json({
    message: 'Accepted'
  });
};

const verify = async (req, res, next) => {
  const { email, token } = req.query;
  let user;
  try {
    user = await User.findOne({
      where: {
        email
      }
    });
  }
  catch (error) {
    return next(new createError.InternalServerError('DB Error[auth verify 1]'));
  }
  if (!user) {
    return next(new createError.NotFound('Email not found'));
  }
  if (user.isVerified) {
    return res.status(202).json({
      message: 'Email already verified'
    });
  }
  let verificationToken;
  try {
    verificationToken = await VerificationToken.findOne({
      where: {
        token
      }
    });
  }
  catch (error) {
    return next(new createError.InternalServerError('DB Error [auth verify 2]'));
  }
  if (!verificationToken) {
    return next(new createError.NotFound('Token expired'));
  }
  try {
    await user.update({ isVerified: true });
  }
  catch (error) {
    return next(new createError.InternalServerError('DB Error [auth verify 3]'));
  }
  return res.redirect(`${process.env.FRONT_URL}/login?confirmation=done`);
};

module.exports = {
  login,
  logout,
  verify
};
