'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    // return queryInterface.dropAllTables();
  queryInterface.createTable(
    'users',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      googleId: {
        type: Sequelize.STRING,
        allowNull: true
      }
    },
    {
      engine: 'MYISAM',                     // default: 'InnoDB'
      charset: 'latin1',                    // default: null
      schema: 'public'                      // default: public, PostgreSQL only.
    }
  )
  },

  down: function (queryInterface, Sequelize) {
    
      // Add reverting commands here.
      // Return a promise to correctly handle asynchronicity.
      // Example:
      return queryInterface.dropTable('users');
    
  }
};
