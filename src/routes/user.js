const {userController} = require('../controllers');
const {validateUser} = require('../middleware/validateUser.middleware');
const router = require('express').Router();

router.route('/register')
    .post(userController.register);

router.route('/login')
    .post(userController.login);

router.route('/logout')
    .get(userController.logout);

router.route('/validate')
    .get(userController.validate);

router.route('/follow')
    .post(validateUser, userController.follow);

module.exports = router;
