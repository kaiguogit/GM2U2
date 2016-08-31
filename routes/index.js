var express = require('express');
var weather = require('../modules/weather');
var time = require('../modules/time');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/api/weather/city', (req, res, next) => {
  console.log("Query is "+req.query.city);
  console.log("Query object is "+req.query);
  weather.currentWeather(req.query.city).then(function(result){
    console.log("result is " + result);
    res.json(result);
  }).catch(function(reason){
    console.log("ERROR + reson is " + reason);
  });
});


router.get('/api/time', (req, res, next) => {
  res.json(time.getTimeString());
});

module.exports = router;
