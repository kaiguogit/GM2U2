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
      origin: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mode: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "walking"
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