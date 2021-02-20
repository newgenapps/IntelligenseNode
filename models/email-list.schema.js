const mongoose = require('mongoose');

// Schema for email listing add the collection name in the second param
const emailSchema = mongoose.Schema({
   domain: String,
   company_name: String,
   email_list: Array
}, { collection : 'Email-List' });

const Email_List = mongoose.model( 'Email-List', emailSchema )

module.exports = Email_List