'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Orders', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'pending'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Orders', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null // Remove the default value
    });
  }
};
