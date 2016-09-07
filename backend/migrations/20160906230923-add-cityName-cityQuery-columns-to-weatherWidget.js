'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    queryInterface.addColumn(
      'weatherWidgets',
      'cityName',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );
    queryInterface.addColumn(
      'weatherWidgets',
      'cityQuery',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
