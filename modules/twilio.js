
// Twilio
var twilio = require('twilio');
// Create a Twilio REST API client for authenticated requests to Twilio
var client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


module.exports.client = client;
module.exports.twilio = twilio;