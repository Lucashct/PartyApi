const dbInfos = {
  user: 'postgres',
  host: 'localhost',
  database: 'partydb',
  password: 'Torres741@',
  port: 5432
}

const database = require('pg').Pool


module.exports = {
  database,
  dbInfos
}