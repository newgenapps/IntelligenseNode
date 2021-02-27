const {user} = require('./db.creds')
const {host} = require('./db.creds')
const {password} = require('./db.creds')
const {port} = require('./db.creds')
const {database} = require('./db.creds')


var fs = require('fs');
const config = {
    user: user,
  host: host,
  database: database,
  password: password,
  port: port,
  ssl: {
    ca: fs.readFileSync('./ca-certificate.crt').toString(),
  }
  }
  

module.exports = {
  config
}