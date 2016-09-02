var express = require('express');
var weather = require('../modules/weather');
var time = require('../modules/time');
var router = express.Router();
var models = require("../models");

/* GET home page. */
router.get('/', function(req, res, next) {
  // if(req.session.user_id){
  //   user = models.Users.find({where: {id: req.session.user_id}})
  // }
  models.Boards.all().then(function(boards) {
    console.log("*******************user in route", req.user);
    if(req.user){
      res.render('index', {boards: boards, user: req.user});
    }else{
      res.render('index', {boards: boards, user: {}});
    }
    
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

  //get all boards
  models.Boards.all().then(function(boards) {

    //Get board name by + 1
    var boardName = "Board" + (boards.length + 1);

    //Create board
    models.Boards
          .build({
              name: boardName
            })
          .save()
          .then(function() {
            models.Boards.findAll({}).then(function(boards) {
                  res.render('index', {boards: boards});
              });
          });
  });
});

//Delete Board
router.delete('/api/boards', (req, res, next)=>{
  console.log("delete board id: ", req.body.id);
  models.Boards.destroy({
    where: {
      id: req.body.id
    }
  }).then(function(board) {
    res.json(board);
  });
});

// Update Board
// router.put('/task/:id', function(req, res) {
//   models.Tasks.find({
//     where: {
//       id: req.params.id
//     }
//   }).then(function(task) {
//     if(task) {
//       task.updateAttributes({
//         title: req.body.title,
//         completed: req.body.completed
//       }).then(function(task) {
//         res.send(task);
//       });
//     }
//   });
// });


module.exports = router;
