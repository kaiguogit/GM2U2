var express = require('express');
var weather = require('../modules/weather');
var time = require('../modules/time');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.db.collection('boards').find().toArray(function(err, results) {
    console.log(results)
    res.render('index', {boards: results});
  // send HTML file populated with quotes here
  });
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

router.post('/api/boards', (req, res, next) => {
  // console.log(err);
  board = {name: "board1"}
  // req.db.collection('board').save(req.body, (err, result) => {
  req.db.collection('boards').save(board, (err, result) => {
      if (err) return console.log(err);

      console.log('saved to database');
      res.json({message: "success"});
  })
});

module.exports = router;
