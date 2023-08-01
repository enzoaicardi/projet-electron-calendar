const sqlite3 = require('sqlite3');
const path = require('path')
let db;

function connect(){
    if(!db) db = new sqlite3.Database(path.join(__dirname + '/database.db'));
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
            db.run(query, params, function(err, rows){
                if(err) throw err;
                res(query.startsWith('INSERT INTO') ? this.lastID : rows);
            });
        });
    }
}

module.exports = connect;