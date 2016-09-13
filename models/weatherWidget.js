"use strict"
// var addToPlaylistArray = require('./widgetLibrary.js').addToPlaylistArray;
// var removeFromPlaylistArray = require('./widgetLibrary.js').removeFromPlaylistArray;

module.exports = function(sequelize, Sequelize) {

  var WeatherWidget = sequelize.define("weatherWidget", {
      id: { 
        type: Sequelize.UUID, 
        primaryKey: true, 
        defaultValue: Sequelize.UUIDV4, 
      },
      widgetType:{
        type: Sequelize.STRING,
        defaultValue: "weather"
      },
      cityName:{
        type: Sequelize.STRING,
      },
      cityQuery:{
        type: Sequelize.STRING,
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
        WeatherWidget.belongsTo(models.playlist);
      }
    }
    // ,
    // hooks:{
    //   afterCreate: addToPlaylistArray,
    //   afterDestroy: removeFromPlaylistArray,
    //   afterBulkDestroy: removeFromPlaylistArray
    // }
  });

    return WeatherWidget;
}