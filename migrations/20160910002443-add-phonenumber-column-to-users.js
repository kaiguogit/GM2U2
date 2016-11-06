'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'users',
      'phoneNumber',
      {
        type: Sequelize.STRING,
        allowNull: true    
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'users',
      'phoneNumber',
      {
        type: Sequelize.STRING,
        allowNull: true    
      }
    );
  }
};
