"use strict"

module.exports = function(sequelize, DataTypes) {
    var Playlist = sequelize.define("playlist", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        widgets:{
          type: DataTypes.ARRAY(DataTypes.UUID),
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
          Playlist.hasMany(models.timeWidget);
        }
      }
    });
    return Playlist;
}