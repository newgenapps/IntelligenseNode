

// const db = require('../index')
const Email_List = require('./../models/email-list.schema')



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
  Email_List.find({domain: req.body.details.domain})
  .then( response => res.json({response})
   )
  .catch( err => res.json({message: `Error !!!: ${err}`}))
}

module.exports.singleSearch = singleSearch
module.exports.domainSearch = domainSearch
module.exports.bulkSearch = bulkSearch