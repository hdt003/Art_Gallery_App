// import { Client } from "pg";
const { Client } = require('pg');

// const { Pool, Client } = require('pg')
// const pool = new Pool({
//   user: 'dbuser',
//   host: 'localhost',
//   database: '202001172_db',
//   password: 'admin',
//   port: 5432,
// })

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: '202001169_db',
    password: 'harshal@003',
    port: 5432
})

module.exports = client

// client.connect()
// client.query('SELECT * from people', (err, res) => {

//   if(!err)
//   {
//      console.log(res.rows);
//   }
//   else{
//     console.log(err.message);
//   }
//   client.end()
// })