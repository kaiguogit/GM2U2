"use strict"

module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        googleId:{
          type: DataTypes.STRING,
          allowNull: true    
        }
    }, {
       tableName: 'Users'
    });

    return Users;
}