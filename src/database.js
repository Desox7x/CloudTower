const mysql = require("mysql");
const { promisify } = require('util');
const { database } = require('./keys');

const pool = mysql.createPool(database);
pool.getConnection((err, connection) => {
    if(err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TOO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION REFUSED');
        }
    }
    if (connection) connection.release();
    console.log('DB is Connected');
    return;
});

//Convirtiendo callbacks a promesas
pool.query = promisify(pool.query);

module.exports = pool;