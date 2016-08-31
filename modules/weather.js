require('dotenv').config();
//Weather Underground npm
// https://github.com/cendrizzi/wundergroundnode
var Wunderground = require('wundergroundnode');
var key = process.env.WU_API_KEY;

if(key){
  var wunderground = new Wunderground(process.env.WU_API_KEY);
}else{
  throw "No WU API Key in env."
}

var weather = {};

weather.currentWeather = (function(wunderground){
  return function(city){
    return new Promise(function(resolve, reject){
      wunderground.conditions().forecast().request(city, function(err, response){
        if(err){
          reject(err);
        }

        var current = response.current_observation;
        var info = {
            name: current.display_location.full,
            icon_url: current.icon_url,
            weather: current.weather,
            temp_c: current.temp_c,
        };
        var speachInfo = {
          name: "City is " + info.name + ". ",
          weather: "Current weather is " + info.weather + ". ",
          temp_c: "Temperature is " + info.temp_c + "degrees. "
        }
        var str = Object.keys(speachInfo).reduce(function(pre, cur){return pre + speachInfo[cur]}, "");
        console.log("inside of api call" + str);
        
        resolve(str);
      });
    });
  }
}
)(wunderground);

console.log(weather);
module.exports = weather;

