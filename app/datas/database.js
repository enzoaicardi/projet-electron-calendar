const sqlite3 = require('sqlite3');
let db;

function database(){
    if(!db) return db = new sqlite3.Database('./app/datas/database.db');
    else return db;
}

module.exports = database;