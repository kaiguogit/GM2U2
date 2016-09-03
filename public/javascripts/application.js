$(function(){

  //module selection
  $(".modules li").click(function(){
    $(this).toggleClass("active");
  });

  //add module to board
  $(".modules button").click(()=>{
    $(".board_body").html("");
    $(".modules li").each(function(i, module){
      if($(module).hasClass("active")){
        var moduleDiv = $("<div>").addClass("col-md-1 board_item").text($(module).text());
        $(".board_body").append(moduleDiv);
      }
    });
  });

  //board play button listenner
  $(".board > .board_title > button.play").click(function(){
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
      values.forEach(function(text){
        console.log(text);
        // speak(value);
      });
      var text = values.join(". ");
      var audio = $('.audio').get(0);
        var voice = 'en-US_AllisonVoice';
        var utteranceOptions = {
          text: text,
          voice: voice,
          sessionPermissions: 1
          };
        synthesizeRequest(utteranceOptions, audio);
    });
         
  });

  //add board button listener
  $(".boards #add_board").click(function(){
    $.ajax({
      url: "/api/playlists",
      method: "post",
      headers: {
      'Authorization':  "Bearer " + window.localStorage.token
      },
      success: function(){
        window.location.reload();
      }
    }).fail(function(err){
      console.log(err);
    });
  });

  $(".boards #get_boards").click(function(){
    $.ajax({
      url: "/api/playlists",
      method: "get",
      success: function(data){
        console.log(data);
      }
    }).fail(function(err){
      console.log(err);
    });
  });

  //delete board button listener
  $(".board > .board_title > button.delete_board").click(function(){
    var boardId = $(this).closest(".board").data("id");
    $.ajax({
      url: "/api/playlists/",
      data: {id: boardId},
      method: "delete",
      success: function(data){
        console.log(data);
        // window.location.reload();
      }
    }).fail(function(err){
      console.log(err);
    });

  });

  $("#login").click(function(){
    $.ajax({
      url: "/login",
      method: "get"
    }).done(function(data, message){
      console.log(data);
      window.localStorage.token = data.token;
      console.log(message);
    }).fail(function(err){
      console.log(err);
    });
  });


  $("#googleAuth").click(function(){
    $.ajax({
      url: "/auth/google",
      method: "get"
    }).done(function(data, message){
      console.log(data);
      window.localStorage.token = data.token;
      console.log(message);
    }).fail(function(err){
      console.log(err);
    });
  });
});