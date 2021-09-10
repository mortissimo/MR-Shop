const UserController = require('../controllers/user_controller');
const { adminAuthorization, authentication } = require('../middlewares/auth');

const router = require('express').Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login)
router.get('/users',authentication, adminAuthorization, UserController.getAll)
module.exports = router;