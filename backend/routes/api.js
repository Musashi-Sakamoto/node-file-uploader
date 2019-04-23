const passport = require('passport');
const router = require('express-promise-router')();

const authController = require('../controllers/authController');
const imageController = require('../controllers/imagesController');
const userController = require('../controllers/usersController');

router.post('/login', authController.login);
router.get('/logout', passport.authenticate('jwt', { session: false }), authController.logout);
router.post('/images', passport.authenticate('jwt', { session: false }), imageController.imageUpload);

router.post('/users', userController.create);

module.exports = router;
