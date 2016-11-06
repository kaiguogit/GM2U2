'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'users',
      'familyName',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
    queryInterface.addColumn(
      'users',
      'givenName',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
    queryInterface.addColumn(
      'users',
      'imageUrl',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
    queryInterface.addColumn(
      'users',
      'email',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
    queryInterface.addColumn(
      'users',
      'accessToken',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'users',
      'familyName',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
    queryInterface.removeColumn(
      'users',
      'givenName',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
    queryInterface.removeColumn(
      'users',
      'imageUrl',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );
    queryInterface.removeColumn(
      'users',
      'email',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );
    queryInterface.removeColumn(
      'users',
      'accessToken',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );
  }
};
