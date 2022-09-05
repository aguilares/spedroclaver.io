const util = require('util')
const mysql = require('mysql')

const pool = mysql.createPool({
  // El número máximo de conexiones para crear a la vez/(Predeterminado: 10)
  connectionLimit: 300,

  host:'localhost',
  user:'root',
  password:'',
  port:3306,
  database:'bd001'
})

pool.getConnection((error, connection)=>{
    if(error){
        throw error;
        // console.log('base de datos no conectado')
    }
    if(connection)
    //liberamos la conexion, para que se pueda usar por otro proceso
        connection.release(); 
    return;
})
pool.query = util.promisify(pool.query)

module.exports = pool