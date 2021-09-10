'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        references:{
          model: "Users",
          key: "id"
        },
        onDelete:'cascade', 
        onUpdate:'cascade'
      },
      FoodId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Food",
          key: "id"
        },
        onDelete:'cascade', 
        onUpdate:'cascade'
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      TransactionId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Transactions",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};