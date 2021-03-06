// TO DO
// MAIL =>
// hi. -> hi,
// if u have problems -> problem

const {dbConnect} = require('./postgres-config/db.connect')
var os = require("os");
//Import dependencies
const express = require('express')
const bodyParser = require('body-parser');
//const emailValidator = require("./email-deep-validator");
const cors = require('cors');
const path = require('path');

// -------------------------------- MONGO CODE TO BE DELETED -------------------------------- //
// mongo connect

// const mongoose = require('mongoose')

// mongoose.connect(dbUri, { 
//     useNewUrlParser: true,
//     useCreateIndex: true
//   })
// .then(() => console.log('MongoDB connected...'))
// .catch(err => console.log(err))

// const db = mongoose.connection
// db.on( 'error', err => console.log(err)  )
// db.once( 'open', () => console.log(' MONGO Db connected') )

// exports.module = db
// -------------------------------- MONGO CODE TO BE DELETED -------------------------------- //


//create a new express application named 'app'
const app = express();

// morgan middleware using for logging
const morgan = require('morgan');
app.use(morgan('dev'))

//Set our backend port to be either an environment variable or port 1105
const port = process.env.PORT ||5000;


// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
});

// Configure the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Configure the CORs middleware
app.use(cors());

// Require Route
const api = require('./routes/verifier_routes');
const emailSearch = require('./routes/email-search_routes');
const techSearch = require('./routes/tech-finder_routes');
const registerUser = require('./routes/register_routes.js');
const user = require('./routes/reset-password.routes');
const socialmedia = require('./routes/social_media.routes');

// Configure app to use route
app.use('/api-v1/', api);
app.use('/email-search/', emailSearch);
app.use('/tech-search/', techSearch);
app.use('/register-user/', registerUser);
app.use('/user/', user);
app.use('/socialmedia/', socialmedia);

// Catch any bad requests
app.get('*', (req, res) => {
    console.log(req.protocol + '://' + req.get('host'))
    res.status(200).json({
        msg: 'Catch All'
    });
});


// Configure our server to listen on the port defiend by our port variable
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`)); 


