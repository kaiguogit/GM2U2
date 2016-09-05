var express = require('express');
var weather = require('../../modules/weather');
var time = require('../../modules/time');
var router = express.Router();
var models = require("../../models/index.js");
// console.log("../../models");
var uuid = require('node-uuid');
//
//Namespace for /api/playlists
//

//Get all playlist for that user
router.get('/',(req, res, next) => {
  console.log("!!!!get /api/playlists!");
  console.log("!!!!User is ", req.user);
  console.log("!!!!User id is ", req.user.userId);
  models.playlist.all({where:{userId: req.user.userId}}).then(function(playlists){
    res.json(playlists);
  });
});

router.get('/:id',(req, res, next) =>{
  console.log(`!!!!get /api/playlists ${req.params.id}`);
  models.playlist.findById(req.params.id).then(function(playlist){
    res.json(playlist.dataValues);
  });
});

//Create Board
router.post('/', (req, res, next) => {
  console.log("post playlist route, user in request is ", req.user);
  console.log("!!!!!!!!!!!!!!!!!playlists");

  //get all boards
  models.playlist.findAll({where:{userId: req.user.userId}})
  .then(function(playlists){
    console.log("!!!!found user's playlists", playlists);
    //Get board name by + 1
    var playlistName = "Playlist" + (playlists.length + 1);
    
    //Create board
    models.playlist
    .build({name: playlistName, userId: req.user.userId})
    .save()
    .then(function(playlist) {
      res.json(playlist);
    });

  });
});

//Delete Board
router.delete('/:id', (req, res, next)=>{
  console.log("delete playlist id: ", req.params.id);
  models.playlist.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(affectedRows) {
    console.log("Affected Rows", affectedRows);
    res.json({message:"Deleted playlist id" + req.params.id + ", affected rows " + affectedRows });
  });
});

//Create TimeWidget to this playlist
router.post('/:id/timeWidget', (req, res, next)=>{
  console.log("!!!!!!!Creating timeWidget for playlist id ", req.params.id);
  models.timeWidget.create({id: uuid.v4(), playlistId: req.params.id})
  .then(function(timeWidget){
    console.log(timeWidget);
    res.json(timeWidget);
  });
});

//Create TrafficWidget to this playlist
router.post('/:id/trafficWidget', (req, res, next)=>{
  console.log("!!!!!!!Creating trafficWidget for playlist id ", req.params.id);
  models.trafficWidget.create({id: uuid.v4(), playlistId: req.params.id})
  .then(function(trafficWidget){
    console.log(trafficWidget);
    res.json(trafficWidget);
  });
});

//Create TimeWidget to this playlist
router.post('/:id/weatherWidget', (req, res, next)=>{
  console.log("!!!!!!!Creating weatherWidget for playlist id ", req.params.id);
  models.weatherWidget.create({id: uuid.v4(), playlistId: req.params.id})
  .then(function(weatherWidget){
    console.log(weatherWidget);
    res.json(weatherWidget);
  });
});

module.exports = router;