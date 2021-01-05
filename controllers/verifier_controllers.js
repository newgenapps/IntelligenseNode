

const EmailValidator = require("./../node_modules/email-deep-validator")

const saySomething = (req, res, next) => {
  console.log("say something request response");
    res.status(200).json({
        body: 'Hello from the server!'
    });
};

//Verifies email Address
const verifier = async(req, res, next) => {
  const emailValidator = new EmailValidator();
  const { wellFormed, validDomain, validMailbox } = await emailValidator.verify(req.body.post);
  console.log('response received');
  res.send(

    `welllformed = ${wellFormed}, validDomain = ${validDomain}, validMailbox = ${validMailbox}`,
    )
  }
  
module.exports.saySomething = saySomething;
module.exports.verifier = verifier;