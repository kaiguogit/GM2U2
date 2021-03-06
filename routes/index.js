var express = require('express');
var path      = require("path");

var playlistController = require('../controller/playlist.js');

var weather = require('../modules/weather');
var time = require('../modules/time');
var textToSpeech = require('../modules/textToSpeech');

var router = express.Router();
var models = require("../models");
var jwt = require('jsonwebtoken');
var jwt_mw = require('express-jwt');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//
//IBM Waston Developer Cloud Synthesize
//
router.get('/api/synthesize', function(req, res, next) {
  var transcript = textToSpeech.synthesize(req.query);
  transcript.on('response', function(response) {
    if (req.query.download) {
      response.headers['content-disposition'] = 'attachment; filename=transcript.ogg';
    }
  });
  transcript.on('error', function(error) {
    next(error);
  });
  transcript.pipe(res);
});

// Return TwiML instuctions for the outbound call
// The TwiMl instruction is from playlist controller
// The /api/playlist/:id/call route in /routes/playlists/playlists.js will call user
// Once call is established, twilio will send a post request to this route /outbound with plyastlist Id
// for instruction of response in the phone.
router.post('/outbound', function(request, response) {
  console.log("In outbound route, playlistId in request is", request.query.playlistId);
  console.log("request query is", request.query);

  var playlistId = request.query.playlistId
  playlistController.twilioSpeech(playlistId, function(twiml){
    response.type('text/xml');
    response.end(twiml.toString(), function (err) {
      if (err) {
        console.log(err);
        response.status(err.status).end();
      }
      else {
        console.log("send instruction to Twilio server");
      }
    });
  });
});


///Create Cron job to trigger this to call user when playlist's alarm is time up
// env EDITOR=nano crontab -e
//* * * * * /usr/bin/curl "http://localhost:3000/api/cron/ringOnAlarm"
//   
router.get('/api/cron/ringOnAlarm', function(request, response){
  playlistController.ringOnAlarm(function(message){
    response.json(message);
  });
});

//update user phone number
router.post('/phone', function(req, res, next){
  console.log("Updating user phone number, user is", req.user);
  console.log("Phone number is ", req.body.phoneNumber);

  models.user.findById(req.user.userId).then(function(user){
    return user.updateAttributes({phoneNumber: req.body.phoneNumber});
  }).then(function(user){
    res.json({success: true, user: user});
  }).catch(function(err){
    res.json({success: false, err: err});
    console.log(err);
  });
})

router.post('/login', function(req, res, next){
  models.user.find({where:{googleId: req.body.googleId}})
  .then(function(user){
    if(user){
      user = user.dataValues;
      var token = jwt.sign({ userId: user.id, userName: user.name, phoneNumber: user.PhoneNumber }, process.env.jwt_secret);
      user["token"] = token;
      console.log("******************found user is ", user);
      console.log("******************token sent is ", token);
      res.json(user);
    }else{
        models.user.build({ 
          googleId: req.body.googleId, 
          name: req.body.name,
          familyName: req.body.familyName,
          givenName: req.body.givenName,
          imageUrl: req.body.imageUrl,
          email: req.body.email,
          accessToken: req.body.accessToken
        })
        .save()
        .then(function(user){
          user = user.dataValues;
          var token = jwt.sign({ userId: user.id, userName: user.name, phoneNumber: user.PhoneNumber }, process.env.jwt_secret);
          user["token"] = token;
          console.log("created user");
          res.json(user);
        });
    }
  });
})
module.exports = router;
