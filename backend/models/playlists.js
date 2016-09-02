"use strict"

module.exports = function(sequelize, DataTypes) {
    var Playlists = sequelize.define("Playlists", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
       tableName: 'Playlists'
    });

    return Playlists;
}