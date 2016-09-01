
function readTime(){
  return $.ajax({
    url: "/api/time",
    method: "get",
  }).fail(function(err){
      console.log(err);
  });
}
var time = {};
time.readTime = readTime;
window.modules.time = time;