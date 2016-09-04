var express = require('express');
var weather = require('../modules/weather');
var time = require('../modules/time');
var router = express.Router();
var models = require("../models");

//
//Namespace for /api/playlists
//

router.get('/',(req, res, next) => {
  console.log("!!!!Getting playlists!");
  console.log("!!!!User is ", req.user);
  console.log("!!!!User id is ", req.user.userId);
  models.playlist.all({where:{userId: req.user.userId}}).then(function(playlists){
    res.json(playlists);
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

// router.delete('/', (req, res, next)=>{
  
// });
module.exports = router;