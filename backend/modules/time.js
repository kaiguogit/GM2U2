//This is a time module
//moment
var moment = require('moment');
//return a string for current time
function getTimeString(){
  // var now = new Date();
  // var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  // var monthNames = ["January", "February", "March", "April", "May", "June",
  //   "July", "August", "September", "October", "November", "December"
  // ];
  //http://stackoverflow.com/questions/12487422/take-a-value-1-31-and-convert-it-to-ordinal-date-w-javascript
  // function getOrdinal(n) {
  //     if((parseFloat(n) == parseInt(n)) && !isNaN(n)){
  //         var s=["th","st","nd","rd"],
  //         v=n%100;
  //         return n+(s[(v-20)%10]||s[v]||s[0]);
  //     }
  //     return n;     
  // }
  // var day = days[now.getDay()];
  // var monthName = monthNames[now.getMonth()];
  // var date = getOrdinal(now.getDay());
  // var hour = now.getHours() + " o'clock";
  // var minute = now.getMinutes() + " minutes";
  // var result = "It is " + day + " " + monthName + " " + date + " " + hour + " "+ minute;
  var result = moment().format('dddd. MMMM Do. YYYY. h:mm a')
  // moment().format('dddd') + breakTag + moment().format('MMMM') + breakTag + moment().format('Do') + breakTag + moment().format('YYYY')
  // var breakTag = "<break strength=\"weak\">weak pause</break>"

  console.log(result);
  result = "<speak version=\"1.0\">" + result + "</speak>"
  return result;
}

module.exports.getTimeString = getTimeString;