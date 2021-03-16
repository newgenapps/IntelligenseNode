

const { dbConnect } = require('../postgres-config/db.connect')
const bcrypt = require('bcrypt');

//Verifies user login
const login = async (req, res, next) => {

    let email = req.body.details.email
    let paswrd = req.body.details.password
    const pool = dbConnect()
    try {
  
      await pool.query('SELECT * FROM public."Users" WHERE UPPER(email)=UPPER($1)', [
        email
      ])
      .then( response => {
        console.log(response.rows[0])
     
        let isPaswrdVerified = comparePassword (response.rows[0].password, paswrd)
        let isVerified = response.rows[0].isverified
       if(isPaswrdVerified == true && isVerified === "true"){
        res.json({
          "user": true
        })}else{
        res.json({
          "user": false
        })}
      } )  
    } catch (err) {
  
      console.error(err.message);
  
    }
  
  }
  
// compares
  function comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

  module.exports.login = login;
