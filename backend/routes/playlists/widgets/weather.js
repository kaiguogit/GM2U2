var express = require('express');
var router = express.Router();
var models = require("../../../models/index.js");

//helper methods
var findPlaylistforWidget = require('../../helper.js').findPlaylistforWidget;
var deleteFromPlaylistArray = require('../../helper.js').deleteFromPlaylistArray;


//////////////////////////////////////////////////////////////////
//This route servers /api/playlist/:playlistId/weatherWidget/
//////////////////////////////////////////////////////////////////


router.get('/:id', (req, res, next)=>{
  console.log("\n!!!!!Getting weatherWidget id", req.params.id);

  //Todo Add more model and change this
  models.weatherWidget.findById(req.params.id)
  .then(function(weatherWidget){
    console.log(weatherWidget);
    res.json(weatherWidget);
  });
});

router.delete('/:id', (req, res, next)=>{
  console.log("\n!!!!!Deleting weatherWidget id", req.params.id);
  var widget = {};
  //Todo Add more model and change this
  models.weatherWidget.findById(req.params.id)
  .then(function(foundWidget){
    widget = foundWidget;
    return foundWidget.destroy();
  })
  .then(function(rows){
    console.log("deleted number of rows is", rows);
    return findPlaylistforWidget(widget);
  })
  .then(function(playlist){
    return deleteFromPlaylistArray(playlist, widget);
  })
  .then(function(playlist){
    console.log("\n!!!!!Updated playlist is", playlist);
    res.json(playlist);
  })
  .catch(function(err){
    console.log("\n!!!!!!Failed to delete a widget, error is ", err);
  });
});

module.exports = router;