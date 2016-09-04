var express = require('express');
var weather = require('../modules/weather');
var time = require('../modules/time');
var router = express.Router();
var models = require("../models");
var uuid = require('node-uuid');
//
//Namespace for /api/playlists
//

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
  models.playlist.all().then(function(playlists) {

    //Get board name by + 1
    var playlistName = "Playlist" + (playlists.length + 1);

    //Create board
    models.playlist
          .build({
              name: playlistName
            })
          .save()
          .then(function() {
            // res.redirect(process.env.frontend + '/');
            res.redirect('/');
          });
  });
});

//Delete Board
router.delete('/', (req, res, next)=>{
  console.log("delete playlist id: ", req.body.id);
  models.playlist.destroy({
    where: {
      id: req.body.id
    }
  }).then(function(affectedRows) {
    console.log("Affected Rows", affectedRows);
    res.json({message:"Deleted playlist id" + req.body.id + ", affected rows " + affectedRows });
  });
});

router.get('/widget/:widgetId', (req, res, next)=>{
  console.log("!!!!!!!id in url for playlist is ", req.params.id);

  //Todo Add more model and change this
  models.timeWidget.findById(req.params.widgetId)
  .then(function(timeWidget){
    console.log(timeWidget);
    res.json(timeWidget);
  });
});

router.post('/:id/timeWidget', (req, res, next)=>{
  console.log("!!!!!!!id in url for playlist is ", req.params.id);
  models.timeWidget.create({id: uuid.v4(), playlistId: req.params.id})
  .then(function(timeWidget){
    console.log(timeWidget);
    res.json(timeWidget);
  });
});
module.exports = router;