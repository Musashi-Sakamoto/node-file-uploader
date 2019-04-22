const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
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
    error.status = 500;
    error.message = 'DB Error';
    return done(error);
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
