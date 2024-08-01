'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add a new column 'tx_ref'
    await queryInterface.addColumn('Orders', 'tx_ref', {
      type: Sequelize.STRING,
      allowNull: true, // Allow null values if appropriate
    });
  },

  async down(queryInterface, Sequelize) {
    
    // Remove the 'tx_ref' column
    await queryInterface.removeColumn('Orders', 'tx_ref');
  }
};
