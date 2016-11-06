"use strict"

module.exports = function(sequelize, Sequelize) {

  var TrafficWidget = sequelize.define("trafficWidget", {
      id: { 
        type: Sequelize.UUID, 
        primaryKey: true, 
        defaultValue: Sequelize.UUIDV4, 
      },
      widgetType:{
        type: Sequelize.STRING,
        defaultValue: "traffic"
      },
      origin: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ""
      },
      destination: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ""
      },
      mode: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "walking"
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
        TrafficWidget.belongsTo(models.playlist);
      }
    }
  });

    return TrafficWidget;
}