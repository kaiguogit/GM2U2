var models = require("../models/index.js");
var twilio = require('../modules/twilio.js').twilio;
var twilioClient = require('../modules/twilio.js').client;
var weatherController = require('./weatherWidget.js');
var newsController = require('./newsWidget.js');
var trafficController = require('./trafficWidget.js');
var quotesController = require('./quotesWidget.js');
var time = require('../modules/time');
var moment = require('moment');

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
  //Call user's phone number.
  //URL is for twilio to get speech instruction once call is answered
  //Twilio will send resquest to /outbound route to get speech instruction 
  //outbound route is in /routes/index.js
  var url =  process.env.host + "/outbound?playlistId=" + playlistId;
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
        case "traffic":
          console.log("getting traffic widget speech");
          speechPromises.push(
            new Promise(function(resolve, reject){
              trafficController.getSpeechString(widget.id, resolve);
            })
          );
          break;
        case "quotes":
          console.log("getting quotes widget speech");
          speechPromises.push(
            new Promise(function(resolve, reject){
              quotesController.getSpeechString(widget.id, resolve);
            })
          );
          break;
      }
    });

    var twiml = new twilio.TwimlResponse();

    Promise.all(speechPromises).then(function(speeches){
      console.log("waiting on promise all to finish");

      models.user.findById(playlist.userId)
      .then(function(user){
        //Greeting 
         var user = user.givenName;
         var humanizedGreeting = "Good " + getGreetingTime(moment()) + ", " + user + ".";
         var downloadURL = process.env.host + '/api/synthesize' +
           '?voice=' + 'en-US_AllisonVoice' +
           '&accept=' + 'audio/wav' +
           '&text=' + encodeURIComponent(humanizedGreeting) +
           '&X-WDC-PL-OPT-OUT=' +  'false' + '&download=true';
         twiml.play(downloadURL);

         speeches.forEach(function(speech){
           
           var downloadURL = process.env.host + '/api/synthesize' +
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
         var url =  process.env.host + "/outbound?playlistId=" + playlistId;
         twiml.redirect(url);
         fn(twiml);
      })
     
    });
  });
}

function getGreetingTime (m) {
  var g = null; //return g
  
  if(!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.
  
  var split_afternoon = 12 //24hr time to split the afternoon
  var split_evening = 17 //24hr time to split the evening
  var currentHour = parseFloat(m.format("HH"));
  
  if(currentHour >= split_afternoon && currentHour <= split_evening) {
    g = "afternoon";
  } else if(currentHour >= split_evening) {
    g = "evening";
  } else {
    g = "morning";
  }
  
  return g;
}
// https://gist.github.com/James1x0/8443042
/* USE
    //The var "humanizedGreeting" below will equal (assuming the time is 8pm) "Good evening, James."
    
    var user = "James";
    var humanizedGreeting = "Good " + getGreetingTime(moment()) + ", " + user + ".";
*/

var playlistController = {
  twilioSpeech: twilioSpeech,
  ring: ring,
  ringOnAlarm: ringOnAlarm
};



module.exports = playlistController