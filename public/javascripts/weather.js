function currentWeather(){
  return $.ajax({
    url: "/api/weather/city",
    method: "get", 
    data: {city: "/q/zmw:00000.1.71892"}
  });
}

var weather = {};
weather.currentWeather = currentWeather;
window.modules.weather = weather;