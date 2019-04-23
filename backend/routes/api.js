const passport = require('passport');
const router = require('express-promise-router')();

const authController = require('../controllers/auth');
const imageController = require('../controllers/images');
const userController = require('../controllers/users');

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/images', passport.authenticate('jwt', { session: false }), imageController.imageUpload);

router.post('/users', userController.create);

module.exports = router;
