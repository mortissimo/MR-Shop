const router = require('express').Router();

const foodRouter = require('./food_routes');
const orderRouter = require('./order_routes');
const userRouter = require('./user_routes');
const transactionRouter = require('./transaction_routes');

router.use('/foods', foodRouter);
router.use('/orders', orderRouter);
router.use('/', userRouter);
router.use('/transactions', transactionRouter);

module.exports = router;