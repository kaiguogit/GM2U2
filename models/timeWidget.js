"use strict"

module.exports = function(sequelize, Sequelize) {

  var TimeWidget = sequelize.define("timeWidget", {
      id: { 
        type: Sequelize.UUID, 
        primaryKey: true, 
        defaultValue: Sequelize.UUIDV4, 
      },
      widgetType:{
        type: Sequelize.STRING,
        defaultValue: "time"
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
  },{
    classMethods: {
      associate: function(models) {
        TimeWidget.belongsTo(models.playlist);
      }
    }

  });

    return TimeWidget;
}