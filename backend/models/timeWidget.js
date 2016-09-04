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
          defaultValue: "TimeWidget"
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

    //After create, add to playlist.widgets array
    TimeWidget.hook('afterCreate', function(timeWidget, options) {
      this.associations.playlist.target.findById(timeWidget.playlistId)
      .then(function(playlist){
        var widgets = playlist.dataValues.widgets
        widgets.push(timeWidget.id);
        playlist.updateAttributes({widgets: widgets});
      });
    })

    return TimeWidget;
}