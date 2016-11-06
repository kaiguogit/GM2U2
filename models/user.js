"use strict"
  var models = require("./index.js");

var User = function(sequelize, Sequelize) {

    var User = sequelize.define("user", {
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        googleId:{
          type: Sequelize.STRING,
          allowNull: true    
        },
        phoneNumber:{
          type: Sequelize.STRING,
          allowNull: true    
        },
        email:{
          type: Sequelize.STRING,
          allowNull: true    
        },
        familyName:{
          type: Sequelize.STRING,
          allowNull: true    
        },
        givenName:{
          type: Sequelize.STRING,
          allowNull: true    
        },
        imageUrl:{
          type: Sequelize.STRING,
          allowNull: true    
        },
        accessToken:{
          type: Sequelize.STRING,
          allowNull: true    
        }
    },{
      classMethods: {
        associate: function(models) {
          User.hasMany(models.playlist);
        }
      },
      timestamps: false
    });

    //create playlist when user is created
    //http://stackoverflow.com/questions/29313763/accessing-other-models-in-a-sequelize-model-hook-function
    //To access the playlist model
    //Use models.user.associations['playlists'].target
    //
    User.hook('afterCreate', function(user, options) {
      this.associations.playlists.target.create({name: "Playlist1", userId: user.id, widgets: []});
    })

    User.hook('beforeDestroy', function(user, options) {
      console.log(`\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\nDeleting User Id ${user.id}\d!!!!!!!!!!!!!!!!`);
    })

    return User;
}
module.exports = User
// 