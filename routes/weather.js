var express = require('express');
var weather = require('../modules/weather');
var time = require('../modules/time');
var router = express.Router();
var models = require("../models");

//
//Namespace for /api/weather
//

//Get Weather
router.get('/city', (req, res, next) => {
  weather.currentWeather(req.query.city).then(function(result){
    res.json(result);
  }).catch(function(reason){
    console.log("ERROR + reson is " + reason);
  });
});


module.exports = router;