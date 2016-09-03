'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
   queryInterface.createTable(
  'playlists',
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
        allowNull: false
      },
      //foreign key usage
      userId: {
          type: Sequelize.INTEGER,
          references: {
              model: 'users',
              key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
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
      return queryInterface.dropTable('playlists');
    
  }
};
