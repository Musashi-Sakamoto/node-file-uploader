const uuidV4 = require('uuid/v4');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Redis = require('ioredis');
const createError = require('http-errors');
const User = require('../models').user;

const redis = new Redis({
  host: process.env.REDIS_ENDPOINT
});

const login = async (req, res, next) => {
  passport.authenticate('local', { session: false }, async (err, user, info) => {
    if (err || !user) {
      return next(new createError.BadRequest(info.message));
    }
    req.login(user, {
      session: false
    }, async (err2) => {
      if (err2) {
        return next(err2);
      }
      const jwtid = uuidV4();
      const token = jwt.sign(user, 'secret', {
        expiresIn: '15h',
        jwtid
      });

      let loginUser;
      try {
        loginUser = await User.findOne({
          attributes: ['id', 'name'],
          where: {
            name: user.name
          }
        });
        await redis.set(loginUser.id, jwtid, 'ex', 60 * 60 * 15);
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
  console.log(req.user);

  req.logout();
  res.status(200).json({
    message: 'Accepted'
  });
};

module.exports = {
  login,
  logout
};
