var express = require('express');
var weather = require('../modules/weather');
var time = require('../modules/time');
var router = express.Router();
var models = require("../models");

//
//Namespace for /api/time
//

//Get Time
router.get('/', (req, res, next) => {
  res.json(time.getTimeString());
});

module.exports = router;

