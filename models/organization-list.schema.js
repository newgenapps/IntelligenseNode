const mongoose = require('mongoose');

// Schema for Organization
const organizationSchema = mongoose.Schema({
   domain: String,
   genre: Array,
   technologies: Array,
   size: String,
   languages: Array,
   country: String
}, { collection : 'Companies-Details' });

const Organization_List = mongoose.model( 'Companies-Details', organizationSchema )

module.exports = Organization_List