const uuidV4 = require('uuid/v4');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models').user;

const login = async (req, res, next) => {
  passport.authenticate('local', { session: false }, async (err, user, info) => {
    if (err || !user) {
      return next(err);
    }

    req.login(user, {
      session: false
    }, async (err2) => {
      if (err) {
        return next(err2);
      }

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
      const token = jwt.sign(user, 'secret', {
        expiresIn: '15h',
        jwtid: uuidV4()
      });

      return res.status(200).json({
        user: loginUser,
        message: info.message,
        token
      });
    });
  })(req, res);
};
