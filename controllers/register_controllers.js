const { dbConnect } = require('../postgres-config/db.connect')

var nodemailer = require('nodemailer');

const randomstring = require('randomstring')
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const { uuid } = require('uuidv4');

var verificationStatus = '';

//User Registration
const register = async (req, res, next) => {

  let { firstname, lastname, password, email } = req.body.details;
  // console.log(req.body)
  console.log('test1')

  // generate secret token
  const secretToken = randomstring.generate();

  // generating json webtoken
  let jwtTokenEmailVerify = jwt.sign({ email }, 'secret', { expiresIn: "1h" });

  //Checking whether user already exists in the database
  const pool = dbConnect()
  try {

    const dbResponse = await pool.query('SELECT * FROM public."Users" WHERE UPPER(email)=UPPER($1)', [
      email,
    ]);
    if (dbResponse.rows.length >= 1) {
      console.log(dbResponse.rows)
      verificationStatus = 'User already exists.'
    }
    else {

      // ----- BCRYPT
      const salt = await bcrypt.genSalt(10);
      // now we set user password to hashed password
      let hashedpassword = await bcrypt.hash(password, salt)

      let hashedJwtToken = await bcrypt.hash(jwtTokenEmailVerify, salt)

      //creating new user in the database
      await pool.query('INSERT INTO public."Users" (firstname, lastname, email, password, isverified, createdat, id, jwttoken) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8 )', [
                                                    firstname, lastname, email, hashedpassword, "false", new Date(), uuid(), hashedJwtToken
      ])
        .then(res => console.log(res.rows));


    }
  }
  catch (err) {
    console.error(err.message);
  }

  console.log('test2')

  

  try {
    await sendVerificationEmail(email, secretToken, jwtTokenEmailVerify)
      .then(() => {
        res.json({
          response: {
            body: verificationStatus

          }
        }
        )
      })
      .catch(err => {
        res.json({
          response: {
            body: verificationStatus

          }
        }
        )
        return null
      })
    // await transporter.sendMail(email,secretToken,jwtTokenEmailVerify);

  }
  catch (err) {
    console.error(err.message);
  }



}


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'testverifier13@gmail.com',
    pass: 'fnlflsfybjwxxhrt'
  }
});


function sendVerificationEmail(email, token, jwtToken) {
  return new Promise((resolve, reject) => {

    console.log('test3')

    link=`http://localhost:5000/register-user/verification?token=${token}&email=${email}&jwtToken=${jwtToken}`
    let mailOptions = {
      from: '<testverifier13@gmail.com>', // sender address
      to: `<${email}>`, // list of receivers
      subject: 'Verify Your Account', // Subject line
      // context: {
      //   verificationLink: `http://localhost:5000/verification?token=${token}&email=${email}&jwtToken=${jwtToken}`
      // },
      html: `verify ur acc by clicking here <a href=${link}>I AM THE LINK </a>`
      //template: 'verification'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("err1 ", error);
        reject(error)

      } else {
        resolve("Activation link has been sent!")
      }
    });

  })
}

const verification = ( req, res, next) => {
  let jwtToken = req.query.jwtToken
  let email = req.query.email
  let jwtHashedToken = ''
  console.log(jwtToken)
  const pool = dbConnect()

  pool.query('SELECT * FROM public."Users" WHERE UPPER(email)=UPPER($1)', [
    email,
  ])
  .then(
    item => {
      jwtHashedToken = item.rows[0].jwttoken
      // console.log(res.rows)
      return jwtHashedToken
    }
  )
  .then(
    () => {
      console.log(bcrypt.compareSync(jwtToken, jwtHashedToken))
      if(bcrypt.compareSync(jwtToken, jwtHashedToken)){
        pool.query('UPDATE public."Users" SET isverified = $1 WHERE UPPER(email)=UPPER($2)', [
          "true",
          email
        ])
        .then( () => res.send("YOUR ACCOUNT IS VERIFIED"))
      }else{
        res.send("SOMETHING WENT WRONG")
      }
    }
  )
  
}



module.exports.register = register;
module.exports.verification = verification;