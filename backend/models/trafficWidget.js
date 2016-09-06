"use strict"

module.exports = function(sequelize, DataTypes) {

  var TrafficWidget = sequelize.define("trafficWidget", {
      id: { 
        type: DataTypes.UUID, 
        primaryKey: true, 
        defaultValue: DataTypes.UUIDV4, 
      },
      widgetType:{
        type: DataTypes.STRING,
        defaultValue: "traffic"
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
        TrafficWidget.belongsTo(models.playlist);
      }
    }
  });

    return TrafficWidget;
}