"use strict"

module.exports = function(sequelize, DataTypes) {

  var NewsWidget = sequelize.define("newsWidget", {
      id: { 
        type: DataTypes.UUID, 
        primaryKey: true, 
        defaultValue: DataTypes.UUIDV4, 
      },
      widgetType:{
        type: DataTypes.STRING,
        defaultValue: "news"
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
        NewsWidget.belongsTo(models.playlist);
      }
    }
  });

    return NewsWidget;
}