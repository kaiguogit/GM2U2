"use strict"

module.exports = function(sequelize, Sequelize) {

  var NewsWidget = sequelize.define("newsWidget", {
      id: { 
        type: Sequelize.UUID, 
        primaryKey: true, 
        defaultValue: Sequelize.UUIDV4, 
      },
      widgetType:{
        type: Sequelize.STRING,
        defaultValue: "news"
      },
      source:{
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {
          name:"the-new-york-times",
          sortBy: "popular"
        }
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
  },{
    classMethods: {
      associate: function(models) {
        NewsWidget.belongsTo(models.playlist);
      }
    }
  });

    return NewsWidget;
}