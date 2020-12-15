'use strict';

const category = require("../models/category");

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
    queryInterface.bulkInsert("Categories", [
      {
        categoryName: "backlog",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: "todo",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: "doing",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: "done",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], null);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete('Categories', null, {});
  }
};
