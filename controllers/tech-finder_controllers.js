
const db = require('../index')
const Organization_List = require('./../models/organization-list.schema')


// Organization search based on Technology
const technologySearch = async (req, res, next) => {
  
  console.log(req.body.post);
  
  Organization_List.find({technologies: req.body.post})
    .then( response => {
      console.log(response)
      res.json({response})
    } )
    .catch( err => res.json({message: `Error !!!: ${err}`}
    )
    )
  }
  
  module.exports.technologySearch = technologySearch
