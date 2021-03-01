var fs = require('fs');
const { Pool, Client } = require('pg')

// $$$$$$$$$$$$$$$ DB-CONFIG FILE IMPORT $$$$$$$$$$$$$$$ //
const { config } = require('./db.config')

const dbConnect = () => {
    try {
        const pool = new Pool(config)
        return pool
    } catch (error) {
        console.log('POSTGRESS HAD SOME ISSUE TO CONNECT')
        console.log(error)
        return null
    }

}

module.exports = {
    dbConnect
}