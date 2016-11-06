'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'quotesWidgets',
      'data',
      {
        type: Sequelize.JSON,
        allowNull: true,
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'quotesWidgets',
      'data',
      {
        type: Sequelize.JSON,
        allowNull: true,
      }
    );
  }
};
