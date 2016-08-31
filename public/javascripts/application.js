$(function(){

  $(".modules li").click(function(){
    $(this).toggleClass("active");
  });

  $(".modules button").click(()=>{
    $(".board_body").html("");
    $(".modules li").each(function(i, module){
      if($(module).hasClass("active")){
        var moduleDiv = $("<div>").addClass("col-md-1 board_item").text($(module).text());
        $(".board_body").append(moduleDiv);
      }
    });
  });

  $(".board > .board_title > button").click(function(){
    var promises = [];
    $('.board_body .board_item').each(function(i, module){

      var moduleName = $(module).text();
      switch(moduleName) {
        case "Time":
          promises.push(modules.time.readTime());
          break;
        case "Weather":
          promises.push(modules.weather.currentWeather());
          break;
        default:
          break;
      }

    });
    Promise.all(promises).then(values =>{
      values.forEach(function(value){
        console.log(value);
        speak(value);
      });
    });
  });

});