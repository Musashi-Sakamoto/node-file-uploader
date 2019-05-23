const passport = require('passport');
const bcrypt = require('bcrypt');
const Redis = require('ioredis');
const createError = require('http-errors');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const redis = new Redis({
  host: process.env.REDIS_ENDPOINT
});
const User = require('./models').user;

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  let user;
  try {
    user = await User.findOne({ where: { name: username } });
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
  if (!user.isVerified) {
    return done(null, false, { message: 'User not verified' });
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
      where: {
        id: jwtPayload.id,
        name: jwtPayload.name
      }
    });
  }
  catch (error) {
    return done(new createError.InternalServerError('DB Error'));
  }
  if (!user) {
    return done(null, false, { message: 'User not found' });
  }
  const token = await redis.get(user.id);
  if (!token) {
    return done(null, false, { message: 'You are logged out' });
  }
  return done(null, user);
}));
