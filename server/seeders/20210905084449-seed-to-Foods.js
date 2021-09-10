'use strict';

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
   let data = [
    {
      name : "Indomie",
      imageUrl: "https://cdn-2.tstatic.net/tribunnews/foto/bank/images/indomie-kpop-6.jpg",
      price: 5000,
      description: "Mie Murah & Lezat 2021 Best",
      stock: 80,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name : "Soto Ayam",
      imageUrl: "https://asset.kompas.com/crops/hgYCTwrFpAN5wQ35-Z2STU9C0vQ=/3x0:700x465/750x500/data/photo/2020/11/08/5fa7d069849e2.jpg",
      price: 12500,
      description: "Soto Murah & Lezat 2021 Best",
      stock: 55,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name : "Satay Kambing",
      imageUrl: "https://asset.kompas.com/crops/qQgyIycoiwFLQfDc-QeBw1sD1ls=/149x448:949x981/750x500/data/photo/2020/04/03/5e863b80dfd27.jpg",
      price: 20000,
      description: "Satay Kambing Murah & Lezat 2021 Best",
      stock: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name : "Nasi Padang",
      imageUrl: "https://asset.kompas.com/crops/k14WaMuO8_y6S94DS0FPBEdQnmw=/0x0:1000x667/750x500/data/photo/2020/09/25/5f6d572a3c1f9.jpg",
      price: 15000,
      description: "Nasi Padang Murah & Lezat 2021 Best",
      stock: 40,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name : "Rendang Sapi Padang",
      imageUrl: "https://cdn-2.tstatic.net/tribunnews/foto/bank/images/resep-rendang.jpg",
      price: 25000,
      description: "Rendang Sapi Padang Murah & Lezat 2021 Best",
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },
   ]
   await queryInterface.bulkInsert('Food', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Food', null, {});
  }
};
