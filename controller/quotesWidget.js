var models = require("../models/index.js");
var request = require('request');

function getSpeechString(widgetId, fn){
  // get the widget
  var promise = models['quotesWidget'].findById(widgetId);
  promise.then(callback);

  function callback(widget){
    var data = widget.dataValues.data;
    sendString('','',data)
  }
  
  // url='http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
  // request(url, sendString);

  function sendString(error, response, body){
    var data = JSON.parse(body);
    var string = "Following is a quote by "
    string = string + data.quoteAuthor + ". "
    string = string + data.quoteText 
    fn(string);
  }
};

function getQuote(widgetId, fn){
  url='http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en'
  request(url, sendQuote);
  function sendQuote(error, response, body){
    fn(body);
  };
};

var quotesController = {};

quotesController.getSpeechString = getSpeechString;
quotesController.getQuote = getQuote;

module.exports = quotesController;