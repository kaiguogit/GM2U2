function currentWeather(){
  return $.ajax({
    url: "/api/weather/city",
    method: "get", 
    data: {city: "/q/zmw:00000.1.71892"}
  }).fail(function(err){
      console.log(err);
  });
}

var weather = {};
weather.currentWeather = currentWeather;
window.modules.weather = weather;