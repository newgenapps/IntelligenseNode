const { dbUri } = require('./database_config/database.config')
const { Pool, Client } = require('pg')


// Postgres connection
try {
    const pool = new Pool({
        user: 'doadmin',
        host: 'orgdata-do-user-7237104-0.b.db.ondigitalocean.com',
        database: 'defaultdb',
        password: 'jj16ytmf0cukykcx',
        port: 25060,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
        ssl: true
      })
      pool.query('SELECT NOW()', (err, res) => {
        console.log(err, res)
        pool.end()
      })
      const client = new Client({
        user: 'doadmin',
        host: 'orgdata-do-user-7237104-0.b.db.ondigitalocean.com',
        database: 'defaultdb',
        password: 'jj16ytmf0cukykcx',
        port: 25060,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
        ssl: true
      })
      client.connect()
      .then(()=> console.log("connected - successfully"))
      .catch( e => console.log('not - connected', e))
      client.query('SELECT NOW()', (err, res) => {
          console.log("connected postgres")
        console.log(err, res)
        client.end()

      })
} catch (error) {
    console.log('POSTGRESS HAD SOME ISSUE TO CONNECT')
    console.log(error)
}


//Import dependencies
const express = require('express')
const bodyParser = require('body-parser');
//const emailValidator = require("./email-deep-validator");
const cors = require('cors');
const path = require('path');

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



// Configure app to use route
app.use('/api-v1/', api);
app.use('/email-search/', emailSearch);
app.use('/tech-search/', techSearch);



// // This middleware informs the express application to serve our compiled React files
// if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
//     app.use(express.static(path.join(__dirname, 'client/build')));

//     app.get('/*', function (req, res) {
//         res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//     });
// };

// Catch any bad requests
app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'Catch All'
    });
});


// Configure our server to listen on the port defiend by our port variable
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`)); 


