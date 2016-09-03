"use strict"

module.exports = function(sequelize, DataTypes) {
    var Playlist = sequelize.define("playlist", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
      classMethods: {
        associate: function(models) {
          Playlist.belongsTo(models.user);
        }
      }
    });
    return Playlist;
}