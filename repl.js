
var repl = require('repl').start({})
var promisify = require('repl-promised').promisify
var models = require("./models");

repl.context.models = models;
repl.context.user = models.user;
repl.context.playlist = models.playlist;
repl.context.timeWidget = models.timeWidget;

// 
// Create DB connection 
// 
models.sequelize.sync().then(function () {
    promisify(repl)
});


