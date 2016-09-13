'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {
     queryInterface.createTable(
    'timeWidgets',
      {
        id: { 
          type: DataTypes.UUID, 
          primaryKey: true, 
          defaultValue: DataTypes.UUIDV4, 
        },
        widgetType:{
          type: DataTypes.STRING,
          defaultValue: "time"
        },
        createdAt: {
          type: DataTypes.DATE
        },
        updatedAt: {
          type: DataTypes.DATE
        },
        //foreign key usage
        playlistId: {
            type: DataTypes.INTEGER,
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
