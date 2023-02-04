const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nba_web'
});

db.connect( (err) => {
    if(err) throw console.log(err);
    console.log('mysql success connect');
});

module.exports = db;