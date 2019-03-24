const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'remotemysql.com',
  user     : 'fW8VOkrTuV',
  password : 'YOEsvfpmjm',
  database : 'fW8VOkrTuV'
});

connection.connect((err) => {
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
});


module.exports = connection;