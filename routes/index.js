var express = require('express');
var wunderground = require ('../modules/weather');
var time = require('../modules/time');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/weather', (req, res, next) => {
  res.render('weather');  
});

router.get('/weather/city', (req, res, next) => {
  // console.log("Query is "+req.query.query);
  // console.log("Query object is "+req.query);
  wunderground.conditions().forecast().request(req.query.query, function(err, response){
    res.json(response);
  });
});

router.get('/api/weather/city', (req, res, next) => {
  console.log("Query is "+req.query.city);
  console.log("Query object is "+req.query);

  wunderground.conditions().forecast().request(req.query.city, function(err, response){
    var current = response.current_observation;
    var info = {
        name: current.display_location.full,
        icon_url: current.icon_url,
        weather: current.weather,
        temp_c: current.temp_c,
    };
    var speachInfo = {
      name: "City is " + info.name + ".",
      weather: "Current weather is" + info.weather + ".",
      temp_c: "Temperature is " + info.temp_c + "degrees."
    }
    var resultStr = Object.keys(speachInfo).reduce(function(pre, cur){return pre + speachInfo[cur]}, "");
    res.json(resultStr);
  });
});


router.get('/time', (req, res, next) => {
  res.json(time.getTimeString());
});

module.exports = router;
