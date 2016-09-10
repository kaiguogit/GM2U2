var models = require("../models/index.js");
var twilio = require('../modules/twilio.js').twilio;
var twilioClient = require('../modules/twilio.js').client;
var weatherController = require('./weatherWidget.js');
var time = require('../modules/time');

module.exports.ringOnAlarm = function ringOnAlarm(){
 console.log("Playlist Controller, ringONAlarm function");
  models.playlist.all({attributes: ['id', 'alarms']})
  .then(function(playlists){
    playlists.forEach(function(playlist){
      console.log("ringOnAlarm", playlist.dataValues);
      if(anyAlarmOnTime(playlist.dataValues.alarms)){
        ring(playlist.dataValues.id)
      }
    });
    
  });
}

function anyAlarmOnTime(alarms){
  var now = new Date();
  alarms.some(function(alarm){
    var alarmTime = new Date(alarm.time);
    return alarmTime.getHours() === now.getHours() && alarmTime.getMinutes() === now.getMinutes();
  })
}
module.exports.ring = function ring(playlistId, fn){
   // This should be the publicly accessible URL for your application
  // Here, we just use the host for the application making the request,
  // but you can hard code it or use something different if need be
  // var url = 'http://' + request.headers.host + '/outbound';
  // var url = 'https://gmtestdesploy.herokuapp.com/outbound';
  var url = "http://b6992d66.ngrok.io/outbound?playlistId=" + playlistId;
  
  models.playlist.findById(playlistId)
  .then(function(playlist){
    return models.user.findById(playlist.dataValues.userId)
  })
  .then(function(user){
    // Place an outbound call to the user, using the TwiML instructions
    // from the /outbound route
    console.log('user phoneNumber is', user.dataValues.phoneNumber);
    twilioClient.makeCall({
        to: user.dataValues.phoneNumber,
        from: process.env.TWILIO_NUMBER,
        url: url
      },function(err, message){
        fn(err, message)
      }
    ); 
  });
}

module.exports.twilioSpeech = function twilioSpeech(playlistId, fn){

  console.log("In PlaylistController, call method, playlistId is", playlistId);
  models.playlist.findById(playlistId)
  .then(function(playlist){
    var speechPromises = [];

    //Collect all widget speeches
    playlist.widgets.forEach(function(widget){
      
      switch(widget.widgetType){
        case "time":
          console.log("getting time widget speech");

          speechPromises.push(
            new Promise(function(resolve, reject){
              resolve(time.getTimeString());
            })
          )  
          break;
        case "weather":
          //find the widget, get weather by City Name
          console.log("getting weather widget speech");
          speechPromises.push(weatherController.getSpeechString(widget.id));
          console.log("speechPromises is", speechPromises );
          break;
        case "": 
          break;
      }
    });

    var twiml = new twilio.TwimlResponse();

    Promise.all(speechPromises).then(function(speeches){
     console.log("waiting on promise all to finish");
      speeches.forEach(function(speech){
        
        var downloadURL = 'http://b6992d66.ngrok.io/api/synthesize' +
          '?voice=' + 'en-US_AllisonVoice' +
          '&accept=' + 'audio/wav' +
          '&text=' + encodeURIComponent(speech) +
          '&X-WDC-PL-OPT-OUT=' +  'false';
           // + '&download=true';
        twiml.play(downloadURL)
        // .pause({length: 2});  
        // twiml.say(speech, {
        //   voice: 'alice',
        //   language: 'en-US',
        //   loop: '0'
        // })
        // .pause({length: 2});
        // console.log("speech is",speech)
      });
      fn(twiml);
    });
  });
}
