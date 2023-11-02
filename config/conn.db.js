const dotenv= require('dotenv')
dotenv.config()
const {createPool} = require('mysql')
const pool =createPool({
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
    debug: false,
    multipleStatements: true

})


module.exports =pool