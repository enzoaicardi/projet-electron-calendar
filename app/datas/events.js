let db = require('./database')()

class EventsData{

    // get
    static async getAll(){
        let res = await db.all(`SELECT * FROM events`);
        console.log(res)
    }

    static async getFromTo(date_start, date_end){
        return await db.all(`SELECT * FROM events WHERE date_start >= ? AND date_end <= ?`,
        [date_start, date_end]);
    }

    // post
    static async add(name, description, date_start, date_end, color){
        return await db.run(`INSERT INTO events (name, description, date_start, date_end, color) VALUES (?, ?, ?, ?, ?)`,
        [name, description, date_start, date_end, color]);
    }

    // put
    static async update(id, name, description, date_start, date_end, color){
        return await db.run(`UPDATE events SET name = ?, description = ?, date_start = ?, date_end = ?, color = ? WHERE id = ?`,
        [name, description, date_start, date_end, color, id]);
    }

    // delete
    static async delete(id){
        return await db.run(`DELETE FROM events WHERE id = ?`, [id]);
    }

}

module.exports = EventsData;