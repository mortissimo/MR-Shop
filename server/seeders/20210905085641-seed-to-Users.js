'use strict';
const bcrypt = require('bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     const salt = bcrypt.genSaltSync(10);
     let data = [
      {
        email : "user@gmail.com",
        password: bcrypt.hashSync('user', salt),
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email : "admin@gmail.com",
        password: bcrypt.hashSync('admin', salt),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
     ]
     await queryInterface.bulkInsert('Users', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
