"use strict"

module.exports = function(sequelize, DataTypes) {
    var Playlist = sequelize.define("playlist", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        widgets:{
          type: DataTypes.ARRAY(DataTypes.JSON),
          defaultValue: []
        },
        createdAt: {
          type: DataTypes.DATE
        },
        updatedAt: {
          type: DataTypes.DATE
        }
    },{
      classMethods: {
        associate: function(models) {
          Playlist.belongsTo(models.user);
        }
      }
    });

    // //Ensure the widget array is up to date
    // Playlist.hook('beforeUpdate', function(playlist, options) {
    //   // this.associations.playlists.target.create({name: "Playlist1", userId: user.id});
    //   //Remove the widget from array
    //   var widgets = playlist.dataValues.widgets;
    //   console.log("\n!!!!!!Before Update playlist widget array, checking.");
    //   widgets.forEach(function(widget, index){

    //     var result = {};
    //     sequelize.models[`${widget.widgetType}Widget`]
    //       .findById(widget.id).then(function(w){
    //         result = w;
    //         if(!result)
    //         {
    //           console.log(`\n!!!!!!${widget.widgetType}Widget does
    //            not exist. id is ${widget.id}`);
    //           console.log(`\n1!!!!!Delete this item from array.`);
    //           widgets.splice(index, 1);
    //           playlist.updateAttributes({widgets: widgets});
    //           console.log("\n1!!!!!after delete the widget[index] is ",widgets[index]);
    //           console.log("\n1!!!!!after delete the widget array is ",widgets);
    //         }else{
    //           console.log(`\n1!!!!!${widget.widgetType}Widget with id ${widget.id} exist
    //             \n checking next widget.`);
    //         }
    //       })
        
    //   });
    // })
    return Playlist;
}