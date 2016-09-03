"use strict"

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("user", {
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        googleId:{
          type: DataTypes.STRING,
          allowNull: true    
        }
    },{
      classMethods: {
        associate: function(models) {
          User.hasMany(models.playlist)
        }
      }
    });
    return User;
}