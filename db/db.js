
const  config =  require('./dbConfig');
var mysql = require('mysql2');

var schedule = require('node-schedule');

let pool = mysql.createPool({
    connectionLimit:config.poolsize,
    host:config.host,
    user:config.username,
    password:config.password,
    database:config.database
});

console.log('-------------------Connection pool created---------------------')

let sql = 'select count(*) from todo'

schedule.scheduleJob('* 5 * * * *',function () {
    pool.query(sql,function (err, rows, fields) {

    })
});

pool.query(sql,function (err, rows, fields) {

});

module.exports = pool.promise()