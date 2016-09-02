"use strict"

module.exports = function(sequelize, DataTypes) {
    var Boards = sequelize.define("Boards", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
       tableName: 'Boards'
    });

    return Boards;
}