'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'trafficWidgets',
      'origin',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
    queryInterface.addColumn(
      'trafficWidgets',
      'destination',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
    queryInterface.addColumn(
      'trafficWidgets',
      'mode',
      {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "walking"
      }
    );
  },

  down: function (queryInterface, Sequelize) {
     queryInterface.removeColumn(
       'trafficWidgets',
       'origin',
       {
         type: Sequelize.STRING,
         allowNull: true,
       }
     );
     queryInterface.removeColumn(
       'trafficWidgets',
       'destination',
       {
         type: Sequelize.STRING,
         allowNull: true,
       }
     );
     queryInterface.removeColumn(
       'trafficWidgets',
       'mode',
       {
         type: Sequelize.STRING,
         allowNull: true,
         defaultValue: "walking"
       }
     );
  }
};
