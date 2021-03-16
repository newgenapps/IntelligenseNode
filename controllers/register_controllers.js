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


      //creating new user in the database
      await pool.query('INSERT INTO public."Users" (firstname, lastname, email, password, isverified, createdat, id) VALUES ( $1, $2, $3, $4, $5, $6, $7 )', [
                                                    firstname, lastname, email, hashedpassword, "false", new Date(), uuid()
      ])
        .then(res => console.log(res.rows));


    }
  }

  catch (err) {
    console.error(err.message);
  }

  console.log('test2')

  // generate secret token
  const secretToken = randomstring.generate();

  // generating json webtoken
  let jwtTokenEmailVerify = jwt.sign({ email }, 'secret', { expiresIn: "1h" });

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
    let mailOptions = {
      from: '<testverifier13@gmail.com>', // sender address
      to: `<${email}>`, // list of receivers
      subject: 'Verify Your Account', // Subject line
      context: {
        verificationLink: `http://localhost:5000/verification?token=${token}&email=${email}&jwtToken=${jwtToken}`
      },
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



module.exports.register = register;
