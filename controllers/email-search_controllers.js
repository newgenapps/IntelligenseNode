

// const db = require('../index')
const Email_List = require('./../models/email-list.schema')
const {client} = require('../index')
const { Pool, Client } = require('pg')
const { Sequelize } = require('sequelize');
var fs = require('fs');

const connectionString = 'postgresql://doadmin:fqk5xvy7un9hoayn@db-postgresql-nyc3-49084-do-user-7237104-0.b.db.ondigitalocean.com:25060/defaultdb'





// filter items by the name and domain
const filterByName = ( fn, lsn, items ) => items.filter(item => item.first_name.toUpperCase() === fn.toUpperCase() && item.last_name.toUpperCase() === lsn.toUpperCase() )


// Single mail search api
const singleSearch = async (req, res, next) => {
  

  let fn = req.body.details.firstName
  let lsn = req.body.details.lastName
  Email_List.find({domain: req.body.details.domain})
  .then( response => {
    let items = response.map( item => item.email_list )[0]
    let finalList = filterByName(fn, lsn, items)
    res.json({
      finalList
    })
  } )
  .catch( err => {
    res.json({
      message: "Error !!!"
    })
  } )
}

// Bulk mail search api
const bulkSearch = async (req, res, next) => {
  Email_List.find({domain: req.body.details.domain})
  .then( response => res.json({response})
   )
  .catch( err => res.json({message: `Error !!!: ${err}`}))
}

// Domain Search
const domainSearch = async (req, res, next) => {
  console.log(req.body.details.domain)
  console.log(req.body.details.domain)

  // Postgres connection
try {
  console.log(connectionString)
    const client = new Client({
      user: 'doadmin',
      host: 'db-postgresql-nyc3-49084-do-user-7237104-0.b.db.ondigitalocean.com',
      database: 'defaultdb',
      password: 'fqk5xvy7un9hoayn',
      port: 25060,
      ssl: {
          ca: fs.readFileSync('ca-certificate.crt').toString(),
        },
    })
    client.connect()
    .then(()=> console.log("connected - successfully"))
    .catch( e => console.log('not - connected', e))
    
    try {
    
      const  id  = req.body.details.domain;
      
      const response = await client.query('SELECT * FROM public."MasterData" WHERE url= $1', [
      
      id
      
      ]);
      
      res.json(response.rows[0]);
      
      } catch (err) {
      
      console.error(err.message);
      
      }

} catch (error) {
  console.log('POSTGRESS HAD SOME ISSUE TO CONNECT')
  console.log(error)
}
    
  // Email_List.find({domain: req.body.details.domain})
  // .then( response => res.json({response})
  //  )
  // .catch( err => res.json({message: `Error !!!: ${err}`}))
}

module.exports.singleSearch = singleSearch
module.exports.domainSearch = domainSearch
module.exports.bulkSearch = bulkSearch