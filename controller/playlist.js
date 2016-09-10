var models = require("../models/index.js");
var twilio = require('../modules/twilio.js').twilio;
var weatherController = require('./weatherWidget.js');
var time = require('../modules/time');

function ring(playlistId, fn){

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



var playlistController = {};

playlistController.ring = ring;

module.exports = playlistController;