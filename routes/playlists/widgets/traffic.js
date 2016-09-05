var express = require('express');
var router = express.Router();
var models = require("../../../models/index.js");

//////////////////////////////////////////////////////////////////
//This route servers /api/playlist/:playlistId/trafficWidget/
//////////////////////////////////////////////////////////////////


router.get('/:id', (req, res, next)=>{
  console.log("\n!!!!!!Getting trafficWidget, id is", req.params.id);

  //Todo Add more model and change this
  models.trafficWidget.findById(req.params.id)
  .then(function(trafficWidget){
    console.log(trafficWidget);
    res.json(trafficWidget);
  });
});

router.delete('/:id', (req, res, next)=>{
  console.log("\n!!!!!!Deleting trafficWidget, id is", req.params.id);

  //Todo Add more model and change this
  models.trafficWidget.findById(req.params.id)
  .then(function(trafficWidget){
    return trafficWidget.destroy();
  })
  .then(function(){
    console.log("Deleted a widget, affected rows are");
    res.json({message: "Deleted"});
  }).catch(function(err){
    console.log("\n!!!!!!Failed to delete a widget, error is ", err);
  });
});

module.exports = router;