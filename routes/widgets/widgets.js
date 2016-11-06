var express = require('express');
var router = express.Router();
var models = require("../../models/index.js");
var time = require('../../modules/time');
var weather = require('../../modules/weather');
var traffic = require('../../modules/traffic');
var weatherController = require('../../controller/weatherWidget');
var newsController = require('../../controller/newsWidget');
var trafficController = require('../../controller/trafficWidget');
var quotesController = require('../../controller/quotesWidget');

//helper methods
var findPlaylistforWidget = require('../helper.js').findPlaylistforWidget;
var deleteFromPlaylistArray = require('../helper.js').deleteFromPlaylistArray;
var updatePlaylistArray = require('../helper.js').updatePlaylistArray;


//////////////////////////////////////////////////////////////////
//This route servers /api/playlist/:playlistId/weatherWidget/
//////////////////////////////////////////////////////////////////


//Get widget
router.get('/:type/:id', (req, res, next)=>{
  console.log("\n!!!!!Getting weatherWidget id", req.params.id);
  var widgetType = req.params.type + "Widget";
  //Todo Add more model and change this
  models[widgetType].findById(req.params.id)
  .then(function(widget){
    console.log(widget);
    res.json(widget);
  });
});

//Delete widget
router.delete('/:type/:id', (req, res, next)=>{
  console.log("\n!!!!!Deleting weatherWidget id", req.params.id);
  var widgetType = req.params.type + "Widget";

  var widget = {};
  //Todo Add more model and change this
  models[widgetType].findById(req.params.id)
  .then(function(foundWidget){
    widget = foundWidget;
    return foundWidget.destroy();
  })
  .then(function(rows){
    console.log("deleted number of rows is", rows);
    return findPlaylistforWidget(widget);
  })
  .then(function(playlist){
    return deleteFromPlaylistArray(playlist, widget);
  })
  .then(function(playlist){
    console.log("\n!!!!!Updated playlist is", playlist);
    res.json(playlist);
  })
  .catch(function(err){
    console.log("\n!!!!!!Failed to delete a widget, error is ", err);
  });
});

//Update widget
router.put('/:type/:id', (req, res, next)=>{
  console.log("\n!!!!!!!!!!!!Updating weatherWidget");
  var newWidget = JSON.parse(req.body.widget);
  var widgetType = req.params.type + "Widget";

  models[widgetType].findById(req.params.id)
  .then(function(widget){
    return widget.updateAttributes(newWidget)
  }).then(function(widget){
    return findPlaylistforWidget(widget);
  }).then(function(playlist){
    return updatePlaylistArray(playlist, newWidget);
  }).then(function(playlist){
    res.json(playlist);
  }).catch(function(err){
    console.log("\n!!!!!!!!!!!!failed to update widget, error is ", err);
  })
});

//get speech string
router.get('/:type/:id/speech', (req, res, next) => {
  var widgetType = req.params.type + "Widget";

  switch(req.params.type){
    case "time":

      res.json(time.getTimeString());
      break;

    case "weather":
      //find the widget, get weather by City Name
      weatherController.getSpeechString(req.params.id)
      .then(function(speech){
        res.json(speech);
      }).catch(function(err){
        res.json(err);
      })
      break;

    case "traffic":
      var speech = trafficController.getSpeechString(req.params.id, function(speech){
        console.log(speech);
        res.json(speech);      
      })
      break;
    case "news":
      newsController.getSpeechString(req.params.id, function(speech){
        res.json(speech);
      })
      break;
    case "quotes":
      quotesController.getSpeechString(req.params.id, function(speech){
        res.json(speech);
      })
      break;
    default:
        res.json("Cannot find widget with type" +req.params.type );
      break;
  }
});

//Get View
router.get('/:type/:id/view', (req, res, next) => {

  var widgetType = req.params.type + "Widget";

  switch(req.params.type){
    case "time":

      res.json(time.getTimeString());
      break;

    case "weather":

      //find the widget, get weather by City Name
      var viewOrSpeech = true;
      models[widgetType].findById(req.params.id)
      .then(function(widget){
        if(widget.cityQuery){
          return weather.currentWeather(widget.cityQuery, viewOrSpeech);
        }else{
          return new Promise(function(resolve, reject){
            reject("There is no city selected. Please click the setting button to select a city.");
          });
        }
      }).then(function(weatherObj){
        res.json(weatherObj);
      }).catch(function(err){
        res.json(err);
      });
      break;
    case "news":
      newsController.getNews(req.params.id, function(news){
        res.json(JSON.stringify(news));
      })
      break;
    case "quotes":
      quotesController.getQuote(req.params.id,function(data){
        res.json(data);
      })
      break;
    default:
      break;

  }
  
});


module.exports = router;