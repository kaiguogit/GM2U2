var models = require("../models/index.js");
var request = require('request');

function getSpeechString(widgetId, fn){
  var url = `https://newsapi.org/v1/articles?source=time&sortBy=top&apiKey=${process.env.newsapi}`

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(JSON.parse(body)); // Print the body of response.
      var articles = JSON.parse(body).articles;
      var speech = articles.reduce(function(previous, current){
        return previous + "<p>" +
          "<s>" + current.title + ". </s>" +
          "<s>" + current.description + ". </s>" + "</p>" +
          "<break strength=\"medium\"></break>"
      }, "");

      speech = "The latest news are: " + speech;

      speech = "<speak version=\"1.0\">" + speech + "</speak>"
      console.log("speech string is", speech);

      fn(speech);
    }else{
     console.log("error occurred when getting news", error);
      fn(error)
    }
  });
}

function getNews(widgetId, fn){
  
  var url = `https://newsapi.org/v1/articles?source=time&sortBy=top&apiKey=${process.env.newsapi}`

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(JSON.parse(body)); // Print the body of response.
      fn(JSON.parse(body));
    }else{
     console.log("error occured when getting news", error);
    }
  });
}

var newsController = {};

newsController.getSpeechString = getSpeechString;
newsController.getNews = getNews;

module.exports = newsController;