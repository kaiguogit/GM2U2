"use strict"
var addToPlaylistArray = require('./widget.js').addToPlaylistArray;
var removeFromPlaylistArray = require('./widget.js').removeFromPlaylistArray;

module.exports = function(sequelize, DataTypes) {

  //AfterCreate
  var addToPlaylistArray = function(weatherWidget, options) {
    console.log("!!!!!adding to playlist after create");
    this.associations.playlist.target.findById(weatherWidget.playlistId)
    .then(function(playlist){
      var widgets = playlist.dataValues.widgets
      widgets.push(weatherWidget);
      playlist.updateAttributes({widgets: widgets});
    });
  }

  //After destroy 
  var removeFromPlaylistArray = function(weatherWidget, option) {
    // console.log("In After Destroy weatherWidget is", weatherWidget);
    this.associations.playlist.target.findById(weatherWidget.playlistId)
    .then(function(playlist){
      // console.log("Before splice, widgets is", widgets);

      //Remove the widget from array
      var widgets = playlist.dataValues.widgets;
      widgets.forEach(function(widget, index){
        if(widget.id === weatherWidget.id){
          widgets.splice(index, 1);
        }
      });
      // console.log("After splice, widgets is", widgets);
      playlist.updateAttributes({widgets: widgets});
    });
  }


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