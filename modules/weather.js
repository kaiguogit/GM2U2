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
  return function(city, viewOrSpeech){
    return new Promise(function(resolve, reject){
      console.log("passing city is", city);
      if(city){
        wunderground.conditions().forecastTenDay().astronomy().hourlyForecast().request(city, function(err, response){
          if(err){
            reject(err);
          }

          try{
            console.log("WU's response is ", response);
            console.log("WU's response result is is ", response.response.results);
            
            //if viewOrSpeech is truthy, return the response directly
            if(viewOrSpeech){
              resolve(response);
            }else{
             
              var current = response.current_observation;
              var info = {
                  name: current.display_location.full,
                  icon_url: current.icon_url,
                  weather: current.weather,
                  temp_c: current.temp_c,
                  feelslike: current.feelslike_c,
              };
              var forecast = {
                today: response.forecast.txt_forecast.forecastday[0].fcttext_metric
              }
              var speachInfo = {
                name: info.name + "'s ",
                weather: "Current weather is " + info.weather + ". ",
                temp_c: "Temperature is " + info.temp_c + "degrees. ",
                // feelslike: "Feels like " + info.feelslike + "degrees."
                today: "Today's forecast is " + forecast.today
              }
              var str = Object.keys(speachInfo).reduce(function(pre, cur){return pre + speachInfo[cur]}, "");            
              resolve(str);
            }
          }catch(err){
            reject(err);
          }

        });
      }else{
        reject({message: "city is empty"});
      }

    });
  }
}
)(wunderground);

module.exports = weather;

