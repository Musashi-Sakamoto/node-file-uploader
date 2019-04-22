const passport = require('passport');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('./models').user;

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  let user;
  try {
    user = await User.findOne({ name: username });
  }
  catch (error) {
    return done(new createError.InternalServerError('DB Error'));
  }
  if (!user) {
    return done(null, false, { message: 'Incorect username.' });
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user.toJSON(), { message: 'Login succeeded!' });
}));

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
}, async (jwtPayload, done) => {
  let user;
  try {
    user = await User.findOne({
      id: jwtPayload.id,
      name: jwtPayload.name
    });
  }
  catch (error) {
    return done(new createError.InternalServerError('DB Error'));
  }
  if (user) {
    return done(null, user);
  }
  return done(null, false, { message: 'User not found' });
}));
