var express = require('express');
var weather = require('../modules/weather');
var time = require('../modules/time');
var router = express.Router();
var models = require("../models");


router.get('/',(req, res, next) => {
  console.log("Moved routes!!!!!!!");
  models.Playlists.all().then(function(playlists){
    console.log(playlists);
    res.json(playlists);
  });
});

//Create Board
router.post('/', (req, res, next) => {
  console.log("!!!!!!!!!!!!!!!!!playlists");
  //get all boards
  models.Playlists.all().then(function(playlists) {

    //Get board name by + 1
    var playlistName = "Playlist" + (playlists.length + 1);

    //Create board
    models.Playlists
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
  models.Playlists.destroy({
    where: {
      id: req.body.id
    }
  }).then(function(affectedRows) {
    console.log("Affected Rows", affectedRows);
    res.json({message:"Deleted playlist id" + req.body.id + ", affected rows " + affectedRows });
  });
});

module.exports = router;