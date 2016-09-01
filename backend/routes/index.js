var express = require('express');
var weather = require('../modules/weather');
var time = require('../modules/time');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

/* GET home page. */
router.get('/', function(req, res, next) {
  req.db.collection('boards').find().toArray(function(err, boards) {
    res.render('index', {boards: boards});
  // send HTML file populated with quotes here
  });
});

//Get Weather
router.get('/api/weather/city', (req, res, next) => {
  weather.currentWeather(req.query.city).then(function(result){
    res.json(result);
  }).catch(function(reason){
    console.log("ERROR + reson is " + reason);
  });
});

//Get Time
router.get('/api/time', (req, res, next) => {
  res.json(time.getTimeString());
});

//Create Board
router.post('/api/boards', (req, res, next) => {

  //get all boards count, + 1 for new board name
  req.db.collection('boards').find().toArray(function(err, results){
    var board = {};
    board.name = "Board" + (results.length + 1);
    //create board
    req.db.collection('boards').save(board, (err, result) => {
        if (err) return console.log(err);
        console.log('saved to database');
        res.json({message: "successfully created board"});
    });
  });
});

//Delete Board
router.delete('/api/boards', (req, res, next)=>{
  req.db.collection('boards').remove({"_id": ObjectId(req.body.id)}, 
  (err, result) => {
    if (err) {
      console.log(err);
      return res.send(500, err);
    }
    console.log(req.body.id + ' board got deleted');
    res.json({message: "successfully deleted board"})
  });
});

module.exports = router;
