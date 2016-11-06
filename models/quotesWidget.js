"use strict"

module.exports = function(sequelize, Sequelize) {

  var QuotesWidget = sequelize.define("quotesWidget", {
      id: { 
        type: Sequelize.UUID, 
        primaryKey: true, 
        defaultValue: Sequelize.UUIDV4, 
      },
      widgetType:{
        type: Sequelize.STRING,
        defaultValue: "quotes"
      },
      data:{
        type: Sequelize.JSON 
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
        QuotesWidget.belongsTo(models.playlist);
      }
    }

  });

    return QuotesWidget;
}