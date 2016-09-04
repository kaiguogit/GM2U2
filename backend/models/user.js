"use strict"
  var models = require("./index.js");

var User = function(sequelize, DataTypes) {

    var User = sequelize.define("user", {
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        googleId:{
          type: DataTypes.STRING,
          allowNull: true    
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
          User.hasMany(models.playlist);
        }
      }
    });

    //create playlist when user is created
    //http://stackoverflow.com/questions/29313763/accessing-other-models-in-a-sequelize-model-hook-function
    //To access the playlist model
    //Use models.user.associations['playlists'].target
    //
    User.hook('afterCreate', function(user, options) {
      this.associations.playlists.target.create({name: "Playlist1", userId: user.id});
    })

    return User;
}
module.exports = User
// 