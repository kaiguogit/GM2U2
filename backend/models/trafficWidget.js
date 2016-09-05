"use strict"
var addToPlaylistArray = require('./widget.js').addToPlaylistArray;
var removeFromPlaylistArray = require('./widget.js').removeFromPlaylistArray;

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
    },
    hooks:{
      afterCreate: addToPlaylistArray,
      afterDestroy: removeFromPlaylistArray,
      afterBulkDestroy: removeFromPlaylistArray
    }
  });

    return TrafficWidget;
}