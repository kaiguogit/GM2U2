function getTime(){
  var now = new Date();
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  function getOrdinal(n) {
      if((parseFloat(n) == parseInt(n)) && !isNaN(n)){
          var s=["th","st","nd","rd"],
          v=n%100;
          return n+(s[(v-20)%10]||s[v]||s[0]);
      }
      return n;     
  }
  var day = days[now.getDay()];
  var monthName = monthNames[now.getMonth()];
  var date = getOrdinal(now.getDay());
  var hour = now.getHours();
  var minute = now.getMinutes();
  var result = "It is " + day + " " + monthName + " " + date + " " + hour + " "+ minute;
  return result;
}

$(function(){
  console.log(getTime());
  speak("Hello Kai");
  speak(getTime());
});
