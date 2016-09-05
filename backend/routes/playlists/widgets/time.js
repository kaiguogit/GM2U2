var express = require('express');
var router = express.Router();
var models = require("../../../models/index.js");


router.get('/:id', (req, res, next)=>{
  console.log("!!!!!!!id in url for playlist is ", req.params.id);

  //Todo Add more model and change this
  models.timeWidget.findById(req.params.id)
  .then(function(timeWidget){
    console.log(timeWidget);
    res.json(timeWidget);
  });
});

router.delete('/:id', (req, res, next)=>{
  console.log("!!!!!!!id in url for playlist is ", req.params.id);

  //Todo Add more model and change this
  models.timeWidget.findById(req.params.id)
  .then(function(timeWidget){
    return timeWidget.destroy();
  })
  .then(function(){
    console.log("Deleted a widget, affected rows are");
    res.json({message: "Deleted"});
  });
});

module.exports = router;