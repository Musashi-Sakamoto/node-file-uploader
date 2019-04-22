const router = require('express-promise-router')();

const imageController = require('../controllers/images');
const userController = require('../controllers/users');

router.post('/images', imageController.imageUpload);

router.post('/users', userController.create);

module.exports = router;
