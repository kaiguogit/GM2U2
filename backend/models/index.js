"use strict";
//http://programminglife.io/nodejs-sequelize-postgresql-tutorial/
var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
require('dotenv').config();


var sequelize = new Sequelize(process.env.db, process.env.db_username, process.env.db_pw, {
    host: 'localhost',
    dialect: 'postgres',
    // dialectOptions: {
    //     ssl: true
    // },
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
        return (file.indexOf(".") !== 0) && (file !== "index.js") && (file !== "widget.js");
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