
function readTime(){
  return $.ajax({
    url: "/api/time",
    method: "get",
  });
}
var time = {};
time.readTime = readTime;
window.modules.time = time;