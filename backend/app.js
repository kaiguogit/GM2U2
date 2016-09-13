require('dotenv').config();

//server
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

//routes
var routes = require('./routes/index');
var routesPlaylist = require('./routes/playlists/playlists');
var routesWidget = require('./routes/widgets/widgets');

//DB
var models = require("./models");

// var session = require('express-session');
var jwt = require('jsonwebtoken');
var jwt_mw = require('express-jwt');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//CORS 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header('Access-Control-Allow-Methods', 'GET, POST, UPDATE, DELETE, OPTIONS, PUT');
  res.header("Access-Control-Allow-Headers", "Authorization, authorization, Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//Check authentication token, put user info in req.user
app.use(jwt_mw({ secret: process.env.jwt_secret})
  .unless({
    path: ['/', '/login', '/outbound', '/api/synthesize', '/api/cron/ringOnAlarm']
  }));

//Define routers path
app.use('/', routes);
app.use('/api/playlists', routesPlaylist);
app.use('/api/widgets/', routesWidget);


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

