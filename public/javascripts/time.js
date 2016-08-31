
function readTime(){
  return $.ajax({
    url: "/time",
    method: "get",
  });
}
var time = {};
time.readTime = readTime;
window.modules.time = time;