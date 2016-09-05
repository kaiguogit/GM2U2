var express = require('express');
var router = express.Router();
var models = require("../../../models/index.js");

//////////////////////////////////////////////////////////////////
//This route servers /api/playlist/:playlistId/timeWidget/
//////////////////////////////////////////////////////////////////


router.get('/:id', (req, res, next)=>{
  console.log("\n!!!!!Getting timeWidget id", req.params.id);

  //Todo Add more model and change this
  models.timeWidget.findById(req.params.id)
  .then(function(timeWidget){
    console.log(timeWidget);
    res.json(timeWidget);
  });
});

router.delete('/:id', (req, res, next)=>{
  console.log("\n!!!!!Deleting timeWidget id", req.params.id);
  var widget = {};
  //Todo Add more model and change this
  models.timeWidget.findById(req.params.id)
  .then(function(timeWidget){
    widget = timeWidget;
    return timeWidget.destroy();
  })
  .then(function(rows){
    console.log("\n!!!!!!!Deleted a widget, affected rows are", rows);
    models.playlist.findById(widget.playlistId).then(function(){
      res.json({message: "Deleted"});
    })
  }).catch(function(err){
    console.log("\n!!!!!!Failed to delete a widget, error is ", err);
  });
});

module.exports = router;