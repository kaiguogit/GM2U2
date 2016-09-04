require('dotenv').config();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var routesPlaylist = require('./routes/playlists');
var routesWeather = require('./routes/weather');
var routesTime = require('./routes/time');
var models = require("./models");
var app = express();
// var session = require('express-session');
var jwt = require('jsonwebtoken');
var jwt_mw = require('express-jwt');
//
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


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// CORS 
app.options('/api/playlists', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header('Access-Control-Allow-Methods', 'GET, POST, UPDATE, DELETE, OPTIONS');

  res.header("Access-Control-Allow-Headers", "Authorization, authorization, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.delete('/api/playlists', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header('Access-Control-Allow-Methods', 'GET, POST, UPDATE, DELETE, OPTIONS');

  res.header("Access-Control-Allow-Headers", "Authorization, authorization, Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//CORS 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header('Access-Control-Allow-Methods', 'GET, POST, UPDATE, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Authorization, authorization, Origin, X-Requested-With, Content-Type, Accept");
  next();
});



//Define routers path
app.use('/', routes);

app.use(jwt_mw({ secret: process.env.jwt_secret}).unless({path: ['/login']}));
app.use('/api/playlists', routesPlaylist);
app.use('/api/weather', routesWeather);
app.use('/api/time', routesTime);

//
//IBM Waston Developer Cloud Synthesize
//
app.get('/api/synthesize', function(req, res, next) {
  var transcript = textToSpeech.synthesize(req.query);
  transcript.on('response', function(response) {
    if (req.query.download) {
      response.headers['content-disposition'] = 'attachment; filename=transcript.ogg';
    }
  });
  transcript.on('error', function(error) {
    next(error);
  });
  transcript.pipe(res);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

