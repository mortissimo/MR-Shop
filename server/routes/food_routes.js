const FoodController = require('../controllers/food_controller');
const { authentication, adminAuthorization } = require('../middlewares/auth');
const router = require('express').Router();


router.get('/', FoodController.getAll);
router.use(authentication);
router.use(adminAuthorization);
router.post('/', FoodController.addFood);
router.delete('/:id', FoodController.deleteFood);
router.patch('/:id', FoodController.editFood);

module.exports = router;