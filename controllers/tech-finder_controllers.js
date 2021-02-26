
const db = require('../index')
const Organization_List = require('./../models/organization-list.schema')

// ########################################################################## // 
// ########################  INITALIZING WAPPALYZER ######################### // 
// ########################  for technology search ########################## // 
// ########################################################################## // 
const Wappalyzer = require('wappalyzer');

const options = {
  debug: false,
  delay: 500,
  headers: {},
  maxDepth: 3,
  maxUrls: 10,
  maxWait: 5000,
  recursive: true,
  probe: true,
  userAgent: 'Wappalyzer',
  htmlMaxCols: 2000,
  htmlMaxRows: 2000,
};

const wappalyzer = new Wappalyzer(options)


// ----------------*** Organization search based on Technologyq ***---------------- //
// ----------------*** Old code ***---------------- //
const technologySearch = async (req, res, next) => {

  console.log(req.body.post);

  Organization_List.find({ technologies: req.body.post })
    .then(response => {
      console.log(response)
      res.json({ response })
    })
    .catch(err => res.json({ message: `Error occured!!!: ${err}` }
    )
    )
}

// ----------------*** Organization search based on Technologyq ***---------------- //
// ----------------*** NEW code ***---------------- //
const getTechnologies = async (req, res, next) => {

  const url = req.body.post;

  console.log(typeof(url))

  try {
    await wappalyzer.init()

    // Optionally set additional request headers
    const headers = {}

    const site = await wappalyzer.open(url, headers)

    // Optionally capture and output errors
    site.on('error', console.error)

    const results = await site.analyze()
    // send response with technologies
    await res.send({"status": 200,"technologies": results.technologies})
  } catch (error) {
    res.send({"status": 400,"message": "there's something wrong this side"})
    console.error(error)
  }

  await wappalyzer.destroy()

}

// ########################################################################## // 
// ########################  MODULE EXPORTS ######################### //
// ########################################################################## // 
module.exports.technologySearch = technologySearch
module.exports.getTechnologies = getTechnologies
