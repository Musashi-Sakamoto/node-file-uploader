const uuidV4 = require('uuid/v4');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const createError = require('http-errors');
const User = require('../models').user;

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
      const token = jwt.sign(user, 'secret', {
        expiresIn: '15h',
        jwtid: uuidV4()
      });

      let loginUser;
      try {
        loginUser = await User.findOne({
          where: {
            name: user.name
          }
        });
      }
      catch (error) {
        error.status = 400;
        error.message = 'DB Error';
        return next(error);
      }
      if (loginUser) delete loginUser.password;

      return res.status(200).json({
        user: loginUser,
        message: info.message,
        token
      });
    });
  })(req, res);
};

const logout = async (req, res, next) => {
  req.logout();
  res.status(200).json({
    message: 'Accepted'
  });
};

module.exports = {
  login,
  logout
};
