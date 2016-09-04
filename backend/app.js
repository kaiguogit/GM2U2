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
var session = require('express-session');
var jwt = require('jsonwebtoken');
var jwt_mw = require('express-jwt');
//
// Google Oauth
//
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var passport = require('passport');

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

//
//configure passport
//Google Strategy
//https://github.com/lynndylanhurley/redux-auth/blob/master/docs/api-expectations/oauth-sign-in.md
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    accessType: "offline"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log("!!!!!!!!!!!!!!!!!Calling google");
    models.user.findOrCreate({where: { name: profile.displayName, googleId: profile.id }, defaults: {job: 'Create user by google id'}})
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
  models.user.findById(id).then(function(user){
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


//CORS 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Define routers path
app.use('/', routes);


// Route for google auth
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

// Route for google autho to callback
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log("**************************user google callback is ", req.user);
    // Successful authentication, redirect home.
    var token = jwt.sign({ userId: req.user.id, userName: req.user.name }, process.env.jwt_secret);
    req.session.token = token;
    // res.redirect("/");
    res.json({
      success: true,
      message: "Enjoy your token!",
      token: token
    });
  });



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

