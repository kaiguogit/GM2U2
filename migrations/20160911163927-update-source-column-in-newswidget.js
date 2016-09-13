'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
     queryInterface.removeColumn(
       'newsWidgets',
       'source',
       {
         type: Sequelize.STRING,
         allowNull: true    
       }
     );
    queryInterface.addColumn(
      'newsWidgets',
      'source',
      {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {
          name:"the-new-york-times",
          sortBy: "popular"
        }
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'newsWidgets',
      'source',
      {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {
          name:"the-new-york-times",
          sortBy: "popular"
        }
      }
    );
  }
};
