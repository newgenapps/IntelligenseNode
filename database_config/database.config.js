const { USERNAME, PASSWORD } = require("./database.credentials");

const DATABASE = "Intelligense"
const dbUri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.wfyd1.mongodb.net/${DATABASE}?retryWrites=true&w=majority`

module.exports.dbUri = dbUri