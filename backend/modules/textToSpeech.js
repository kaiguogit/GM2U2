//
//  Waston Developer Cloud
//
var watson       = require('watson-developer-cloud');
// 
var textToSpeech = watson.text_to_speech({
  version: 'v1',
  username: process.env.waston_api_username,
  password: process.env.waston_api_password
});

module.exports = textToSpeech;