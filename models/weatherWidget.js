"use strict"
var addToPlaylistArray = require('./widgetLibrary.js').addToPlaylistArray;
var removeFromPlaylistArray = require('./widgetLibrary.js').removeFromPlaylistArray;

module.exports = function(sequelize, DataTypes) {

  var WeatherWidget = sequelize.define("weatherWidget", {
      id: { 
        type: DataTypes.UUID, 
        primaryKey: true, 
        defaultValue: DataTypes.UUIDV4, 
      },
      widgetType:{
        type: DataTypes.STRING,
        defaultValue: "weather"
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
        WeatherWidget.belongsTo(models.playlist);
      }
    },
    hooks:{
      afterCreate: addToPlaylistArray,
      afterDestroy: removeFromPlaylistArray,
      afterBulkDestroy: removeFromPlaylistArray
    }
  });

    return WeatherWidget;
}