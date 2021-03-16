

const { dbConnect } = require('../postgres-config/db.connect')


//Verifies user login
const login = async (req, res, next) => {

    let email = req.body.details.email
    let paswrd = req.body.details.password
  
    const pool = dbConnect()
    try {
  
      const response = await pool.query('SELECT * FROM public."Users" WHERE UPPER(email)=UPPER($1)', [
        email
      ]);
  
      console.log(response.rows[0])
     
      let isPaswrdVerified = comparePassword (response.rowCount[0].details.password)

     if(isPaswrdVerified == true)
      res.json('User verified')
      else
      res.json('User unverified')


    } catch (err) {
  
      console.error(err.message);
  
    }
  
  }
  
// compares
  function comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

  module.exports.login = login;
