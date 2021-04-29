// text center align
const { dbConnect } = require('../postgres-config/db.connect')
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { AUTH_SECRET } = require('../authentication/auth.secret');
// Node Mailer creds
const transporter = nodemailer.createTransport({
    host: 'smtp.pepipost.com',
    port: 587,
    secure: false,
    auth: {
      user: 'swatisrivastava',
      pass: 'swatisrivastava_5dca659a99476896a361f0497838885a'
    }
});


const resetPasswordReqhandler = async (req, res, next) =>{
    let {email, currentHost} = req.body.details
    console.log(email)
    const pool = dbConnect()
    

    try {
        await pool.query('SELECT * FROM public."Users" WHERE UPPER(email)=UPPER($1)', [
            email
        ])
        .then(
            response => {
                console.log(response.rows)
                if (response.rows.length > 0) {
                    sendResetEmail(response.rows[0].firstname, response.rows[0].lastname, email, response.rows[0].id,currentHost)
                    res.send({
                        status: 200,
                        message: 'mail sent'
                    })
                }
            }
        )
    } catch (error) {
        console.log(error)
        res.send(
            {
                message: 'server error',
                status: 300
            }
        )
    }
}

function sendResetEmail(firstname, lastname, email, id, currentHost) {

    let clientName = `${firstname} ${lastname}`

    let token = jwt.sign({ id: id }, AUTH_SECRET, { expiresIn: "1h" });
    let link = `http://${currentHost}/reset-password/${token}/${email}`
    return new Promise((resolve, reject) => {
  
      let mailOptions = {
        from: '<info@mail.intelligense.io>', // sender address
        to: `<${email}>`, // list of receivers
        subject: 'Reset Your Password', // Subject line
        html: `<p>Hi ${clientName},</p><p>We have received request to reset your password.<br/><br/>
        Click below to reset your password:<br/><br/>
        ${link}</br><br/>
        If you haven't requested a password request please ignore this mail.<br/><br/></p>
        <p style="color: red;"> <b>*</b> Note this mail is vaild only for 1hr. <b>*</b></p>
        <p><b>Thanks! – The Intelligense team</b></p>`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("err1 ", error);
          reject(error)
  
        } else {
          resolve("Reset link has been sent!")
        }
      });
  
    })
  }



  const resetPassword = async (req, res, next) => {
      let password = req.headers.password
      let token = req.headers.authorization.split(' ')[1];
      let email = req.body.details.email

      const pool = dbConnect()
      // const token = req.headers.authorization.split(' ')[1];
      console.log(token)
      try {
        const decodedToken = jwt.verify(token, AUTH_SECRET);
      const id = decodedToken.id;
      console.log(decodedToken)
      // ----- BCRYPT
      const salt = await bcrypt.genSalt(10);
      // now we set user password to hashed password
      let hashedpassword = await bcrypt.hash(password, salt)
      await pool.query('UPDATE public."Users" SET password = $1 WHERE UPPER(id)=UPPER($2)', [
        hashedpassword,
        id
      ])
      .then(response =>{
         console.log(response.rows)
         res.send({
           message: 'success',
           status: 200
         })
        })
      .catch( err => {
        res.send({
          message: 'no user found',
          status: 401
        })
      })
      } catch (error) {
        
        res.send({
          message: 'no user found',
          status: 401
        })
      }
      
  }
  module.exports.resetPasswordReqhandler = resetPasswordReqhandler;
  module.exports.resetPassword = resetPassword;