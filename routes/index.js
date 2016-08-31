var express = require('express');
var wunderground = require ('../modules/weather')
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

module.exports = router;
