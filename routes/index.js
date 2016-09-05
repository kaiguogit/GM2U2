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
      res.render('index', {playlists: playlists, user: req.user});
    }else{
      res.render('index', {playlists: playlists, user: {}});
    }
    
  // send HTML file populated with quotes here
  });
});

//TESTING PURPOSE
router.get('/users', function(req, res, next){

  models.user.all().then(function(users){
    res.json(users);
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

router.post('/login', function(req, res, next){

  models.user.findOrCreate({where: { googleId: req.body.googleId, name: req.body.username }, defaults: {job: 'Create user by google id'}})
  .spread(function(user, created) {
    console.log(user.get({
      plain: true
    }));
    console.log("created",created);
    console.log("******************found user is ", user.dataValues);
    user = user.dataValues;
    var token = jwt.sign({ userId: user.id, userName: user.name }, process.env.jwt_secret);
    user["token"] = token;
    res.json(user);
  });
})
module.exports = router;
