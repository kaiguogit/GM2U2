"use strict"

module.exports = function(sequelize, DataTypes) {

  //AfterCreate
  var addToPlaylistArray = function(timeWidget, options) {
    console.log("!!!!!adding to playlist after create");
    this.associations.playlist.target.findById(timeWidget.playlistId)
    .then(function(playlist){
      var widgets = playlist.dataValues.widgets
      widgets.push(timeWidget);
      playlist.updateAttributes({widgets: widgets});
    });
  }

  //After destroy 
  var removeFromPlaylistArray = function(timeWidget, option) {
    // console.log("In After Destroy timeWidget is", timeWidget);
    this.associations.playlist.target.findById(timeWidget.playlistId)
    .then(function(playlist){
      // console.log("Before splice, widgets is", widgets);

      //Remove the widget from array
      var widgets = playlist.dataValues.widgets;
      widgets.forEach(function(widget, index){
        if(widget.id === timeWidget.id){
          widgets.splice(index, 1);
        }
      });
      // console.log("After splice, widgets is", widgets);
      playlist.updateAttributes({widgets: widgets});
    });
  }


  var TimeWidget = sequelize.define("timeWidget", {
      id: { 
        type: DataTypes.UUID, 
        primaryKey: true, 
        defaultValue: DataTypes.UUIDV4, 
      },
      widgetType:{
        type: DataTypes.STRING,
        defaultValue: "timewidget"
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
    },
    hooks:{
      afterCreate: addToPlaylistArray,
      afterDestroy: removeFromPlaylistArray,
      afterBulkDestroy: removeFromPlaylistArray
    }
  });

    return TimeWidget;
}