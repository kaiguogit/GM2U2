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
  models.Playlists.all().then(function(playlists) {
    console.log("*******************user in route", req.user);
    if(req.user){
      console.log("setting uid into session");
      req.session["uid"] = req.user.id;
      res.render('index', {playlists: playlists, user: req.user});
    }else{
      res.render('index', {playlists: playlists, user: {}});
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
