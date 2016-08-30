require('dotenv').config();

var Wunderground = require('wundergroundnode');
var wunderground = new Wunderground(process.env.WU_API_KEY);


wunderground.conditions().request('84111', function(err, response){
    console.log(response);
});

