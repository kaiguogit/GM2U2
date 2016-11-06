'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {
     queryInterface.createTable(
    'playlists',
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
          allowNull: false
        },
        //Todo use it to save a array of widgets
        ///timeWidget.findAll().then(function(array){console.log(array[0].$modelOptions.name.singular)});
        // > a
        // [ { id: 1, model: 'timeWidget' },
        //   { id: 1, model: 'weatherWidget' } ]
        // > var myJsonString = JSON.stringify(a);
        widgets:{
          type: DataTypes.ARRAY(DataTypes.JSON),
          defaultValue: []
        },
        //foreign key usage
        userId: {
            type: DataTypes.INTEGER,
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
