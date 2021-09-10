const OrderController = require('../controllers/order_controller');
const { authentication, adminAuthorization } = require('../middlewares/auth');

const router = require('express').Router();

router.use(authentication);
router.get('/', adminAuthorization, OrderController.getAllOrder);
router.get('/:transactionId', OrderController.getByTransactionId)
module.exports = router;