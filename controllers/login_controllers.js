

const { dbConnect } = require('../postgres-config/db.connect')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AUTH_SECRET } = require('../authentication/auth.secret')

// let secret = [
//   '-----BEGIN PRIVATE KEY-----',
//   'MIIBVAIBADANBgkqhkhuashfasfFAASCAT4wggE6AgEAAkEAkcd7iupXSHhgIRat',
//   'b2gnEiyC3AIf7GCrISTtgMsdascczcZnU8sIqwwd3BV6qD+pExeyvMyU085RHRX',
//   'ud1cyQIDAQABAkAzmni6GPAiwDHPJLbqK+VAwq7j8ICasft23523r1fas/O4V75m',
//   'e2ExeqV05+jlzVOGrQ953n8Mx1u0uRgPlfoBAiEAyO3qytGKRRzlqBuGwPFPde4a',
//   '66ZW4AmRcBwwuKp1zgkCIQC5u/2j/JFzM4GTbpoC0a2u78+tqYQW7Y/Usu6AAubI',
//   'wQIhAMKbhMQJ7UUBNwH6GjunHyry5pUEl7Iasd99jejkllask3ui237uiufe00w6',
//   'qc1kJJarxHfgQIgcw2oEtn8GbvNMOsFYBSMHowxiza8yxdcNg0Q9TPMdQ+uhxhWK',
//   'xhVgWkIkTVU=',
//   '-----END PRIVATE KEY-----',
// ].join('\n');

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
        let token = jwt.sign({ id: response.rows[0].id }, AUTH_SECRET);

        // let tokenDecoded = jwt.sign({ id: id }, "intelligenseIsFun", { algorithm: 'RS256'});
        // console.log(token)
        // jwt.verify(token, secret, function(err, decoded) {
        //   console.log(decoded) // bar
        // });
        
       if(isPaswrdVerified == true && isVerified === "true"){
        res.send({
          status: 200,
          token: token
        })}else{
        res.send({
          status: 404,
          message: "invaid user"
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
