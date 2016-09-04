'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {

    // return queryInterface.dropAllTables();
  queryInterface.createTable(
    'users',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      googleId: {
        type: DataTypes.STRING,
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
