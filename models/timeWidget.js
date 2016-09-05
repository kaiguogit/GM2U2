"use strict"

module.exports = function(sequelize, DataTypes) {

  var TimeWidget = sequelize.define("timeWidget", {
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
  },{
    classMethods: {
      associate: function(models) {
        TimeWidget.belongsTo(models.playlist);
      }
    }

  });

    return TimeWidget;
}