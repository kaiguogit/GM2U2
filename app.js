require('dotenv').config();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var routesPlaylists = require('./routes/playlists');
var models = require("./models");
var app = express();
var session = require('express-session');
// var jwt = require('jsonwebtoken');

//
// Google Oauth
//
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var passport = require('passport');

// 
// Initalize sequelize with session store
//
//https://github.com/mweibel/connect-session-sequelize
// var SequelizeStore = require('connect-session-sequelize')(session.Store);

// app.use(cookieParser())
// express session
app.use(session({
  secret: process.env.COOKIESECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    maxAge: 60000 
  }
  // ,
  // store: new SequelizeStore({
  //   db: models.sequelize
  // })
}))

//configure passport
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    accessType: "offline"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log("!!!!!!!!!!!!!!!!!Calling google");
    models.Users.findOrCreate({where: { name: profile.displayName, googleId: profile.id }, defaults: {job: 'Create user by google id'}})
    .spread(function(user, created) {
      console.log(user.get({
        plain: true
      }));
      console.log("created",created);
      console.log("******************found user is ", user.dataValues);
      return cb(null,user.dataValues);
    });
}));

//http://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
// serialize and deserialize
passport.serializeUser(function(user, done) {
  console.log("*********************serailizing", user.id);
  done(null, user.id);
});


passport.deserializeUser(function(id, done) {
  models.Users.findById(id).then(function(user){
    console.log("**********************deserializeUser", user.dataValues);
    done(null, user.dataValues);
  })
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.use('/auth/', pp_routes);
app.use('/', routes);
app.use('/api/playlists', routesPlaylists);

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!uid from session", req.session.uid);
    console.log("**************************user google callback is ", req.user);
    // Successful authentication, redirect home.
    res.redirect(process.env.frontend + "/");
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

