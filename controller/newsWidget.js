var models = require("../models/index.js");
var request = require('request');

function getSpeechString(widgetId, fn){

  models.newsWidget.findById(widgetId)
  .then(function(widget){

    if(widget.dataValues.source){
      console.log("source exists");

      var sourceName = widget.dataValues.source.name;
      var sortBy = widget.dataValues.source.sortBy;
    }else{
      console.log("source does not exist");

      var sourceName = "the-new-york-times";
      var sortBy = "popular";
    }
    var url = `https://newsapi.org/v1/articles?source=${sourceName}&sortBy=${sortBy}&apiKey=${process.env.newsapi}`
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(JSON.parse(body)); // Print the body of response.
        var articles = JSON.parse(body).articles;

        var breakTag = "<break strength=\"medium\"></break>"
        var speech = articles.splice(0, 3).reduce(function(previous, current){
          return previous + "<p>" +
            "<s>" + current.title + ". </s>" +
            "<s>" + current.description + ". </s>" + "</p>" +
            breakTag
        }, "");

        sourceName =  sourceName.split("-").map(capitalizeWord).join(" ");

        speech = `The latest news from ${sourceName}: ${breakTag} ${speech}`;

        speech = "<speak version=\"1.0\">" + speech + "</speak>"
        console.log("speech string is", speech);

        fn(speech);
      }else{
       console.log("error occurred when getting news", error);
       console.log("response status is", JSON.parse(response.body).status);
       console.log("response message is", JSON.parse(response.body).message);
        fn(response)
      }
    });
  })
}

function capitalizeWord(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

function getNews(widgetId, fn){
  models.newsWidget.findById(widgetId)
  .then(function(widget){

    if(widget.dataValues.source){
      console.log("source exists");
      var sourceName = widget.dataValues.source.name;
      var sortBy = widget.dataValues.source.sortBy;
    }else{
      console.log("source does not exist");
      var sourceName = "the-new-york-times";
      var sortBy = "popular";
    }

    var url = `https://newsapi.org/v1/articles?source=${sourceName}&sortBy=${sortBy}&apiKey=${process.env.newsapi}`

    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(JSON.parse(body)); // Print the body of response.
        fn(JSON.parse(body));
      }else{
       console.log("error occured when getting news", error);
      }
    });
  })
  
}

var newsController = {};

newsController.getSpeechString = getSpeechString;
newsController.getNews = getNews;

module.exports = newsController;