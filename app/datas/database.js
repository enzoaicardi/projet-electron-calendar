const sqlite3 = require('sqlite3');
let db;

function connect(){
    if(!db) db = new sqlite3.Database(process.cwd() + './database.db');
    return aasqlite;
}

const aasqlite = {
    all(query, params = []){
        return new Promise(res => {
            db.all(query, params, (err, rows)=>{
                if(err) throw err;
                res(rows);
            });
        });
    },
    run(query, params = []){
        return new Promise(res => {
            db.run(query, params, (err, rows)=>{
                if(err) throw err;
                res(rows);
            });
        });
    }
}

module.exports = connect;