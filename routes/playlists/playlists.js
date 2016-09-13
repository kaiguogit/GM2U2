var express = require('express');
var weather = require('../../modules/weather');
var time = require('../../modules/time');
var router = express.Router();
var models = require("../../models/index.js");
var uuid = require('node-uuid');
var playlistController = require('../../controller/playlist.js');

//helper methods
var findPlaylistforWidget = require('../helper.js').findPlaylistforWidget;
var addToPlaylistArray = require('../helper.js').addToPlaylistArray;

//////////////////////////////////////////////////////////////////
//This route servers /api/playlist/
//////////////////////////////////////////////////////////////////




//Get all playlist for that user
router.get('/',(req, res, next) => {
  console.log("\n!!!!get /api/playlists!");
  console.log("\n!!!!User is ", req.user);
  console.log("\n!!!!User id is ", req.user.userId);
  models.playlist.all({where:{userId: req.user.userId}}).then(function(playlists){
    res.json(playlists);
  });
});

router.get('/:id',(req, res, next) =>{
  console.log(`\n!!!!get /api/playlists ${req.params.id}`);
  models.playlist.findById(req.params.id).then(function(playlist){
    res.json(playlist.dataValues);
  });
});

// Call user and play the playlist
// Handle an AJAX POST request to place an outbound call
router.get('/:playlistId/call', function(req, res, next) {

  playlistController.ring(req.params.playlistId, function(err, message){
    console.log(err);
    if (err) {
        res.status(500).send(err);
    } else {
        res.send({
            message: 'Thank you! We will be calling you shortly.'
        });
    }
  });
});

//Create Board
router.post('/', (req, res, next) => {
  console.log("post playlist route, user in request is ", req.user);
  console.log("\n!!!!!!!!!!!!!!!!!playlists");

  //get all boards
  models.playlist.findAll({where:{userId: req.user.userId}})
  .then(function(playlists){
    console.log("\n!!!!found user's playlists", playlists);
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
  console.log("\n!!!!!delete playlist id: ", req.params.id);
  models.playlist.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(affectedRows) {
    console.log("\n!!!!Affected Rows", affectedRows);
    res.json({message:"Deleted playlist id" + req.params.id + ", affected rows " + affectedRows });
  });
});


//Create widget to this playlist
router.post('/:id/:widgetType', (req, res, next)=>{
  console.log(`\n!!!!!!!Creating ${req.params.widgetType} for playlist id  ${req.params.id}`);
  models[req.params.widgetType].create({id: uuid.v4(), playlistId: req.params.id})
  .then(findPlaylistforWidget)
  .then(addToPlaylistArray)
  .then(function(playlist){
    console.log("\n!!!!!returned variable after playlist update is", playlist.dataValues);
    res.json(playlist);
  });
});

// //Create TimeWidget to this playlist
// router.post('/:id/timeWidget', (req, res, next)=>{
//   console.log("\n!!!!!!!Creating timeWidget for playlist id ", req.params.id);
//   models.timeWidget.create({id: uuid.v4(), playlistId: req.params.id})
//   .then(findPlaylistforWidget)
//   .then(addToPlaylistArray)
//   .then(function(playlist){
//     console.log("\n!!!!!returned variable after playlist update is", playlist.dataValues);
//     res.json(playlist);
//   });
// });



// //Create TrafficWidget to this playlist
// router.post('/:id/trafficWidget', (req, res, next)=>{
//   console.log("\n!!!!!!!Creating trafficWidget for playlist id ", req.params.id);
//   models.trafficWidget.create({id: uuid.v4(), playlistId: req.params.id})
//   .then(findPlaylistforWidget)
//   .then(addToPlaylistArray)
//   .then(function(playlist){
//     console.log("\n!!!!!returned variable after playlist update is", playlist.dataValues);
//     res.json(playlist);
//   });
// });

// //Create TimeWidget to this playlist
// router.post('/:id/weatherWidget', (req, res, next)=>{
//   console.log("\n!!!!!!!Creating weatherWidget for playlist id ", req.params.id);
//   models.weatherWidget.create({id: uuid.v4(), playlistId: req.params.id})
//   .then(findPlaylistforWidget)
//   .then(addToPlaylistArray)
//   .then(function(playlist){
//     console.log("\n!!!!!returned variable after playlist update is", playlist.dataValues);
//     res.json(playlist);
//   });
// });

//Update playlist
router.put('/:id', (req, res, next)=>{

  var newPlaylist = JSON.parse(req.body.playlist);
  models.playlist.findById(newPlaylist.id)
  .then(function(playlist){
    return playlist.updateAttributes(newPlaylist)
  }).then(function(playlist){
    res.json(playlist);
  }).catch(function(err){
    console.log("\n!!!!!!!!!!!!failed to update playlist, error is ", err);
  })
});

module.exports = router;