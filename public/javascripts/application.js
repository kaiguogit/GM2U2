$(function(){

  
  function readTime(){
    $.ajax({
      url: "/time",
      method: "get",
      success: function(timeString){
        console.log(timeString);
        speak(timeString);
      }
    });
  }

  readTime();
});