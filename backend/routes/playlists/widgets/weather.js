var express = require('express');
var router = express.Router();
var models = require("../../../models/index.js");

//helper methods
var findPlaylistforWidget = require('../../helper.js').findPlaylistforWidget;
var deleteFromPlaylistArray = require('../../helper.js').deleteFromPlaylistArray;
var updatePlaylistArray = require('../../helper.js').updatePlaylistArray;


//////////////////////////////////////////////////////////////////
//This route servers /api/playlist/:playlistId/weatherWidget/
//////////////////////////////////////////////////////////////////


//Get widget
router.get('/:id', (req, res, next)=>{
  console.log("\n!!!!!Getting weatherWidget id", req.params.id);

  //Todo Add more model and change this
  models.weatherWidget.findById(req.params.id)
  .then(function(weatherWidget){
    console.log(weatherWidget);
    res.json(weatherWidget);
  });
});

//Delete widget
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

//Update widget
router.put('/:id', (req, res, next)=>{
  console.log("\n!!!!!!!!!!!!Updating weatherWidget");
  var newWidget = JSON.parse(req.body.widget);

  models.weatherWidget.findById(newWidget.id)
  .then(function(widget){
    return widget.updateAttributes(newWidget)
  }).then(function(widget){
    return findPlaylistforWidget(widget);
  }).then(function(playlist){
    return updatePlaylistArray(playlist, newWidget);
  }).then(function(playlist){
    res.json(playlist);
  }).catch(function(err){
    console.log("\n!!!!!!!!!!!!failed to update widget, error is ", err);
  })
});


module.exports = router;