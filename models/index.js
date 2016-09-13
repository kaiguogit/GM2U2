"use strict";
//http://programminglife.io/nodejs-sequelize-postgresql-tutorial/
var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");

var env = process.env.NODE_ENV || 'development';
if (env === 'production') {
    var db_host = process.env.db_host_prod;
    var db_username =  process.env.db_username_prod;
    var db =  process.env.db_prod;
    var db_pw =  process.env.db_pw_prod;
    var db_ssl = true;    
}
if (env === 'development'){
    var db_host = process.env.db_host_dev;
    var db_username =  process.env.db_username_dev;
    var db =  process.env.db_dev;
    var db_pw =  process.env.db_pw_dev;
    var db_ssl = false;
}


var sequelize = new Sequelize(db, db_username, db_pw, {
    host: db_host,
    dialect: 'postgres',
    dialectOptions: {
        ssl: db_ssl
    },
    define: {
        timestamps: false
    },
    freezeTableName: true,
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    }
});

var db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js") 
        && (file !== "widgetLibrary.js");
    })
    .forEach(function(file) {
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;