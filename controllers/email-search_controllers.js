const Email_List = require('./../models/email-list.schema')
const { dbConnect } = require('../postgres-config/db.connect')

const dns = require('dns')

// Single mail search api
const singleSearch = async (req, res, next) => {


  let fn = req.body.details.firstName
  let lsn = req.body.details.lastName
  let domain = req.body.details.url

  const pool = dbConnect()
  try {

    const response = await pool.query('SELECT * FROM public."Emails" WHERE UPPER(firstname)=UPPER($1) AND UPPER(lastname)= UPPER($2) AND UPPER(url)= UPPER($3)', [
      fn,
      lsn,
      domain
    ]);

    await console.log(response.rows[0])
    await res.json(response.rows[0]);
  } catch (err) {

    console.error(err.message);

  }
}

// Bulk mail search api
const bulkSearch = async (req, res, next) => {
  const client = dbConnect()
  try {

    const id = req.body.details.domain;

    const response = await client.query('SELECT * FROM public."Emails" WHERE url= $1', [
      id
    ]);
    await console.log(response)
    await res.json(response);
    await client.end()
  } catch (err) {

    console.error(err.message);

  }
}

// Domain Search
const domainSearch = async (req, res, next) => {
  const client = dbConnect()
  try {

    const id = req.body.details.domain;
    console.log(id)

    const response = await client.query('SELECT * FROM public."Emails" WHERE url= $1', [
      id
    ]);
    console.log(response)
    res.json(response);
    client.end()
  } catch (err) {

    console.error(err.message);

  }
}

const guestDomainSearch = async (req, res, next) => {
  dns.lookup(req.hostname, (err, address) => console.log(address) )
  const client = dbConnect()
  try {

    const id = req.body.details.domain;
    console.log(id)

    const response = await client.query('SELECT * FROM public."Emails" WHERE url= $1 LIMIT 5', [
      id
    ]);
    const count = await client.query('SELECT COUNT(*) FROM public."Emails" WHERE url= $1', [
      id
    ]);
    console.log(response)
    console.log(count)
    res.status(200).json({emailObject: response, count: count.rows[0].count});
    client.end()
  } catch (err) {

    console.error(err.message);

  }
}

// Single mail search api
const guestSingleSearch = async (req, res, next) => {


  let fn = req.body.details.firstName
  let lsn = req.body.details.lastName
  let domain = req.body.details.url

  const pool = dbConnect()
  try {

    const response = await pool.query('SELECT * FROM public."Emails" WHERE UPPER(firstname)=UPPER($1) AND UPPER(lastname)= UPPER($2) AND UPPER(url)= UPPER($3)', [
      fn,
      lsn,
      domain
    ]);

    await console.log(response.rows[0])
    if(response.rows[0]){
      await res.json(response.rows[0]);
    }else{
      await res.status(400).json({
        message: "not found"
      })
    }
  } catch (err) {

    console.error(err.message);

  }
}

module.exports.singleSearch = singleSearch
module.exports.domainSearch = domainSearch
module.exports.bulkSearch = bulkSearch
module.exports.guestDomainSearch = guestDomainSearch
module.exports.guestSingleSearch = guestSingleSearch