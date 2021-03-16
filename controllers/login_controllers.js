

const { dbConnect } = require('../postgres-config/db.connect')


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
     
        let isPaswrdVerified = comparePassword (response.rowCount[0].password)
        let isVerified = response.rowCount[0].isverified
       if(isPaswrdVerified == true && isVerified === "true")
        res.json('User verified')
        else
        res.json('User unverified')
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
