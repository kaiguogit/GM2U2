var models = require("../models/index.js");
var request = require('request');

function getSpeechString(widgetId, fn){
  var promise = models['trafficWidget'].findById(widgetId);
  promise.then(getString);

  function getString(widget){
    
    var origin = widget.dataValues.origin;
    var destination = widget.dataValues.destination;
    var mode = widget.dataValues.mode;

    if(!origin || !destination){
      fn("Your traffic widget has not been initialized.");
    }
    else {
      var getOriginId = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${origin}&key=${process.env.GOOGLE_MAPS_API_KEY}`
      var getDestinationId = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${destination}&key=${process.env.GOOGLE_MAPS_API_KEY}`
      var originId;
      var destinationId;
      console.log(getOriginId)

      request(getOriginId,setOriginId);

      function setOriginId(error, response, body){
        var data = JSON.parse(body);
        console.log('origin:',data)
        if(data && data.results && data.results[0] && data.results[0].place_id){
          originId = data.results[0].place_id;
        }else{
         originId = "";
        }
        request(getDestinationId,setDestinationId)
      };

      function setDestinationId(error, response, body){
        var data = JSON.parse(body);
        console.log('destination:',data);
        if(data && data.results && data.results[0] && data.results[0].place_id){
           destinationId = data.results[0].place_id;
        }else{
           destinationId = "";
        }
        var getDistance = `https://maps.googleapis.com/maps/api/distancematrix/json?&mode=${mode}&origins=place_id:${originId}&destinations=place_id:${destinationId}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
        request(getDistance,setString);
      };
    
      function setString(error, response, body){
        var data = JSON.parse(body);
        console.log(data);
        var speech = "Trip information. " ;
        speech = speech+'Trip starts at '+ origin+'. ';
        speech = speech+'The destination is '+ destination+'. ';
        speech = speech+'The distance is '+ data.rows[0].elements[0].distance.text+'. ';
        speech = speech+'Travel time is '+ data.rows[0].elements[0].duration.text+' ';
        switch (mode){
          case 'walking':
          speech = speech+'on foot. '
          break;
          case 'driving':
          speech = speech+'by car. '
          break;
          case 'transit':
          speech = speech+'by transit. '
          break;
          case 'bicycling':
          speech = speech+'by bike. '        
        };
        speech = speech.replace('mins','minutes')
        console.log(speech);
        fn(speech);
      };
    }
  };
}

var trafficWidget = {};
trafficWidget.getSpeechString = getSpeechString;
module.exports = trafficWidget;