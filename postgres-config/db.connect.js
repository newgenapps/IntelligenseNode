var fs = require('fs');
const { Pool, Client } = require('pg')

// $$$$$$$$$$$$$$$ DB-CONFIG FILE IMPORT $$$$$$$$$$$$$$$ //
const { config } = require('./db.config')

const dbConnect = () => {
    try {
        const client = new Client(config)
        client.connect()
            .then(() => console.log("connected - successfully"))
            .catch(e => console.log('not - connected', e))
        return client
    } catch (error) {
        console.log('POSTGRESS HAD SOME ISSUE TO CONNECT')
        console.log(error)
        return null
    }

}

module.exports = {
    dbConnect
}