const passport = require('passport');
const router = require('express-promise-router')();

const authController = require('../controllers/authController');
const imageController = require('../controllers/imagesController');
const userController = require('../controllers/usersController');
const postController = require('../controllers/postsController');

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/verification', authController.verify);

router.post('/images', passport.authenticate('jwt', { session: false }), imageController.imageUpload);
router.get('/images', passport.authenticate('jwt', { session: false }), imageController.list);

router.post('/users', userController.create);
router.get('/users', passport.authenticate('jwt', { session: false }), userController.list);
router.delete('/users/:id', passport.authenticate('jwt', { session: false }), userController.destroy);

router.post('/posts', passport.authenticate('jwt', { session: false }), postController.create);
router.get('/posts', passport.authenticate('jwt', { session: false }), postController.list);
router.put('/posts/:id', passport.authenticate('jwt', { session: false }), postController.update);
router.delete('/posts/:id', passport.authenticate('jwt', { session: false }), postController.destroy);

module.exports = router;
