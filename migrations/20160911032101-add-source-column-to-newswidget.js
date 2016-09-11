'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'newsWidgets',
      'source',
      {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "the-new-york-times"
      }
    );
  },

  down: function (queryInterface, Sequelize) {
   queryInterface.removeColumn(
     'newsWidgets',
     'source',
     {
       type: Sequelize.STRING,
       allowNull: true    
     }
   );
  }
};
