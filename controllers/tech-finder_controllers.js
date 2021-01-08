
const db = require('../index')
const Organization_List = require('./../models/organization-list.schema')


// Organization search based on Technology
const technologySearch = async (req, res, next) => {
  
  console.log("test");
  
  Organization_List.find({technology: req.body.post})
    .then( response =>  res.json({response}))
    .catch( err => res.json({message: `Error !!!: ${err}`}
    )
    )
  }
  
  module.exports.technologySearch = technologySearch
