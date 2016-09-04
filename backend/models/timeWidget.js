"use strict"

module.exports = function(sequelize, DataTypes) {
    var TimeWidget = sequelize.define("timeWidget", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
      classMethods: {
        associate: function(models) {
          TimeWidget.belongsTo(models.playlist);
        }
      }
    });
    return TimeWidget;
}