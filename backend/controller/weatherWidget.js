var models = require("../models/index.js");
var weather = require('../modules/weather');

function getSpeechString(widgetId){
  console.log("contacting weatherUnderground widgetId", widgetId);
  var widgetType = "weatherWidget";
  //find the widget, get weather by City Name
  var viewOrSpeech = false;
  return models[widgetType].findById(widgetId)
    .then(function(widget){
      if(widget.cityQuery){

        return weather.currentWeather(widget.cityQuery, viewOrSpeech);
      }else{
        return new Promise(function(resolve, reject){
          resolve("There is no city selected. Please click the setting button to select a city.");
        });
      }
    })
}


var weatherWidget = {};

weatherWidget.getSpeechString = getSpeechString;

module.exports = weatherWidget;