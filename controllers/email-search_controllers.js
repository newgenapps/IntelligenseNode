const Email_List = require('./../models/email-list.schema')
const { dbConnect } = require('../postgres-config/db.connect')

// filter items by the name and domain
const filterByName = (fn, lsn, items) => items.filter(item => item.first_name.toUpperCase() === fn.toUpperCase() && item.last_name.toUpperCase() === lsn.toUpperCase())

// Single mail search api
const singleSearch = async (req, res, next) => {


  let fn = req.body.details.firstName
  let lsn = req.body.details.lastName
  let domain = req.body.details.url

  const client = dbConnect()
  try {

    const response = await client.query('SELECT * FROM public."EmailsTable" WHERE UPPER(firstname)=UPPER($1) AND UPPER(lastname)= UPPER($2) AND UPPER(url)= UPPER($3)', [
      fn,
      lsn,
      domain
    ]);

    console.log(response.rows[0])
    res.json(response.rows[0]);
    client.end()
  } catch (err) {

    console.error(err.message);

  }

  // Email_List.find({ domain: req.body.details.domain })
  //   .then(response => {
  //     let items = response.map(item => item.email_list)[0]
  //     let finalList = filterByName(fn, lsn, items)
  //     res.json({
  //       finalList
  //     })
  //   })
  //   .catch(err => {
  //     res.json({
  //       message: "Error !!!"
  //     })
  //   })
}

// Bulk mail search api
const bulkSearch = async (req, res, next) => {
  const client = dbConnect()
  try {

    const id = req.body.details.domain;

    const response = await client.query('SELECT * FROM public."EmailsTable" WHERE url= $1', [
      id
    ]);
    console.log(response)
    res.json(response);
    client.end()
  } catch (err) {

    console.error(err.message);

  }
  // Email_List.find({ domain: req.body.details.domain })
  //   .then(response => res.json({ response })
  //   )
  //   .catch(err => res.json({ message: `Error !!!: ${err}` }))
}

// Domain Search
const domainSearch = async (req, res, next) => {
  const client = dbConnect()
  try {

    const id = req.body.details.domain;
    console.log(id)

    const response = await client.query('SELECT * FROM public."EmailsTable" WHERE url= $1', [
      id
    ]);
    console.log(response)
    res.json(response);
    client.end()
  } catch (err) {

    console.error(err.message);

  }
}

module.exports.singleSearch = singleSearch
module.exports.domainSearch = domainSearch
module.exports.bulkSearch = bulkSearch