'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, {foreignKey:'UserId'})
      Transaction.hasMany(models.Order, {foreignKey:'TransactionId'})
    }
  };
  Transaction.init({
    UserId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    totalPrice: DataTypes.INTEGER,
    invoiceImgUrl: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};