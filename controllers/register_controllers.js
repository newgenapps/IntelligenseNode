const { dbConnect } = require('../postgres-config/db.connect')

var nodemailer = require('nodemailer');

const randomstring = require ('randomstring')
const jwt = require('jsonwebtoken');

var verificationStatus = '';

//User Registration
const register = async (req, res, next) => {

    let { firstname,lastname, password, email } = req.body;

    console.log('test1')

  //Checking whether user already exists in the database
  const pool = dbConnect()
    try {

      const dbResponse = await pool.query('SELECT * FROM public."Users" WHERE UPPER(email)=UPPER($1)', [
        email,
      ]);
      if(dbResponse.rowCount = 1){
        
        verificationStatus = 'User already exists.'
      } 
      else{
      
        //password encryption
        password = bcrypt.hashSync(password, 10);
       
        //creating new user in the database
        pool.query('INSERT INTO public."Users"(firstname, lastname, email, password, isverified)values(firstname, lastname, email, password))');
        

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

    try{

      await transporter.sendMail(email,secretToken,jwtTokenEmailVerify);

    }
    catch (err) {
      console.error(err.message);
    }
    

    res.json({
      response: {
        body: verificationStatus

      }
    }
    )
  }

  
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'testverifier13@gmail.com',
           pass: 'fnlflsfybjwxxhrt'
       }
   });

  
  function sendVerificationEmail(email, token, jwtToken){
    return new Promise((resolve, reject) => {

      console.log('test3')

        let mailOptions = {
            from: '<testverifier13@gmail.com>', // sender address
            to: '<swati.srivastava@newgenapps.com>', // list of receivers
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
