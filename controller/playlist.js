var models = require("../models/index.js");
var twilio = require('../modules/twilio.js').twilio;
var twilioClient = require('../modules/twilio.js').client;
var weatherController = require('./weatherWidget.js');
var newsController = require('./newsWidget.js');
var time = require('../modules/time');

function ringOnAlarm(fn){
 console.log("Checking all playlists alarms. Calling user if alarm is triggered.");
 var messages = [];
  models.playlist.all({attributes: ['id', 'alarms']})
  .then(function(playlists){
    playlists.forEach(function(playlist){
      if(anyAlarmOnTime(playlist.dataValues.alarms)){

        ring(playlist.dataValues.id, function(err, message){
          if(err){
            console.log("Error occurred when calling user for playlist" + playlist.dataValues.id);
          }else{
            console.log(`Calling user for playlist ${playlist.dataValues.id}`);
          }
        });
        messages.push({message: `Playlist ${playlist.dataValues.id}'s alarm is time up. Calling User`})
      }else{
        console.log(`Playlist ${playlist.dataValues.id} has no alarm time up.`);
      }
    });
    
    if (messages.length === 0){
      fn({messsage: "No playlist has alarm triggered"});
    }else{
      fn(messages);
    }
  });
}

function anyAlarmOnTime(alarms){
  var now = new Date();
  return alarms.some(function(alarm){
    var alarmTime = new Date(alarm.time);
    return alarmTime.getHours() === now.getHours() && alarmTime.getMinutes() === now.getMinutes();
  })
}

function ring(playlistId, fn){
   // This should be the publicly accessible URL for your application
  // Here, we just use the host for the application making the request,
  // but you can hard code it or use something different if need be
  // var url = 'http://' + request.headers.host + '/outbound';
  // var url = 'https://gmtestdesploy.herokuapp.com/outbound';
  var url =  process.env.proxy + "/outbound?playlistId=" + playlistId;
  console.log(`Calling user for playlist ${playlistId}, the url for outbound is`, url);
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

function twilioSpeech(playlistId, fn){

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
        case "news":
          console.log("getting news widget speech");
          speechPromises.push(
            new Promise(function(resolve, reject){
              newsController.getSpeechString(widget.id, resolve);
            })
          );
          break;
      }
    });

    var twiml = new twilio.TwimlResponse();

    Promise.all(speechPromises).then(function(speeches){
     console.log("waiting on promise all to finish");
      speeches.forEach(function(speech){
        
        var downloadURL = process.env.proxy + '/api/synthesize' +
          '?voice=' + 'en-US_AllisonVoice' +
          '&accept=' + 'audio/wav' +
          '&text=' + encodeURIComponent(speech) +
          '&X-WDC-PL-OPT-OUT=' +  'false' + '&download=true';
        console.log("Speech url is ", downloadURL);
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
      var url =  process.env.proxy + "/outbound?playlistId=" + playlistId;
      twiml.redirect(url);
      fn(twiml);
    });
  });
}
var playlistController = {
  twilioSpeech: twilioSpeech,
  ring: ring,
  ringOnAlarm: ringOnAlarm
};
module.exports = playlistController