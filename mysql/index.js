
// mysql/index.js
 
var mysql = require('mysql');
var config = require('../config/default.js')
 
var pool  = mysql.createPool({
  host: config.database.HOST,
  port: config.database.PORT,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
});
 
 
class Mysql {
    constructor () {
 
    }
    query ({name, pwd}) {
      return new Promise((resolve, reject) => {
        pool.query('SELECT `id` FROM user WHERE name="' + name + '" AND pwd="' + pwd + '"', function (error, results, fields) {
            if (error) {
                throw error
            };
            resolve(results)
            // console.log('The solution is: ', results[0].solution);
        });
      })
       
    }
}
 
module.exports = new Mysql()
 