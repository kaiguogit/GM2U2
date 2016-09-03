var express = require('express');
var weather = require('../modules/weather');
var time = require('../modules/time');
var router = express.Router();
var models = require("../models");
var jwt = require('jsonwebtoken');
var jwt_mw = require('express-jwt');
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("user in request is ", req.user);

  models.playlist.all().then(function(playlists) {
    console.log("*******************user in route", req.user);
    console.log("********************session in request is ", req.session);
    if(req.user){
      console.log("setting uid into session");
      req.session["uid"] = req.user.id;
      res.render('index', {playlists: playlists, user: req.user});
    }else{
      res.render('index', {playlists: playlists, user: {}});
    }
    
  // send HTML file populated with quotes here
  });
});

router.get('/login', function(req, res, next){
  console.log("user in request is ", req.user);
  models.user.findById(1).then(function(user){
    console.log("!!!!!!!!!!!login user id is ", user.id);
    var token = jwt.sign({ userId: user.id, userName: user.name }, process.env.jwt_secret);
    console.log("!!!!!!token is ", token);
    var decoded = jwt.verify(token, process.env.jwt_secret);
    console.log("!!!!!!decoded token is ",decoded.userId);
    res.json({
      success: true,
      message: "Enjoy your token!",
      token: token
    });
  });
});
module.exports = router;
