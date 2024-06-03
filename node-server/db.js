const Pool = require("pg").Pool;

// const DATABASE_URL =
//   "postgres://u7rbuqublbq032:pea94c304e0e967b441badd64c0ab9cf9cbd7065b63144bb9747f1fcefe50e351@c3gtj1dt5vh48j.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/ddtp3ooa1p3flg";
//
// const pool = new Pool({
//   connectionString: DATABASE_URL,
//   ssl: { rejectUnauthorized: false },
// });
//
// console.log("url: " + DATABASE_URL);


const pool = new Pool({
  user: "postgres",
  password: "admin",
  host: "localhost",
  port: 5432,
  database: "music_library",
});

module.exports = pool;
