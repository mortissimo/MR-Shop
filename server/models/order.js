'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {foreignKey:'UserId'});
      Order.belongsTo(models.Food, {foreignKey:'FoodId', onDelete:'cascade', onUpdate:'cascade'});
      Order.belongsTo(models.Transaction, {foreignKey:'TransactionId'});
    }
  };
  Order.init({
    UserId: DataTypes.INTEGER,
    FoodId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    TransactionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};