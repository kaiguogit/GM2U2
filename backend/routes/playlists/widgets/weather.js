var express = require('express');
var router = express.Router();
var models = require("../../../models/index.js");

//////////////////////////////////////////////////////////////////
//This route servers /api/playlist/:playlistId/weatherWidget/
//////////////////////////////////////////////////////////////////


router.get('/:id', (req, res, next)=>{
  console.log("!!!!!!Getting weatherWidget, id is", req.params.id);

  //Todo Add more model and change this
  models.weatherWidget.findById(req.params.id)
  .then(function(weatherWidget){
    console.log(weatherWidget);
    res.json(weatherWidget);
  });
});

router.delete('/:id', (req, res, next)=>{
  console.log("!!!!!!Deleting weatherWidget, id is", req.params.id);

  //Todo Add more model and change this
  models.weatherWidget.findById(req.params.id)
  .then(function(weatherWidget){
    return weatherWidget.destroy();
  })
  .then(function(){
    console.log("Deleted a widget, affected rows are");
    res.json({message: "Deleted"});
  });
});

module.exports = router;