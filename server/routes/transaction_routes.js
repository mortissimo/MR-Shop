const OrderController = require('../controllers/order_controller');
const TransactionController = require('../controllers/transaction_controller');
const { authentication, adminAuthorization } = require('../middlewares/auth');
const router = require('express').Router();

router.use(authentication);
router.post('/', TransactionController.createTransaction);
router.get('/', TransactionController.getAllTransaction);


module.exports = router;