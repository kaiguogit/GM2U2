'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
     queryInterface.createTable(
    'timeWidgets',
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
        playlistId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'playlists',
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
   
    return queryInterface.dropTable('timeWidgets');
  }
};
