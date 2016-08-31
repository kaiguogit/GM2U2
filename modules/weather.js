require('dotenv').config();
//Weather Underground npm
// https://github.com/cendrizzi/wundergroundnode
var Wunderground = require('wundergroundnode');
var key = process.env.WU_API_KEY;
if(key){
  var wunderground = new Wunderground(process.env.WU_API_KEY);
}else{
  throw "No WU API Key in env."
}

module.exports = wunderground;

