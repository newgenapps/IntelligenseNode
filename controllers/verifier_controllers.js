

const EmailValidator = require("./../node_modules/email-deep-validator")
const verify = require("./../node_modules/bulk-email-verifier")

var domain = 'gmail.com';
var emails =  [
    'test3@gmail.com',
    'test1@gmail.com',
    'swatisrivs.13@gmail.com'
];

var domains = [
  'skyfut2.com',
  'yahoomail.com', 
  'yahoo.com', 
  'gmail.com',
  'abc2.com',
  'rediff.com'
];

const saySomething = (req, res, next) => {
  console.log("say something request response");
    res.status(200).json({
        body: 'Hello from the server!'
    });
};

//Verifies single email Address
const verifier = async(req, res, next) => {
  
  const emailValidator = new EmailValidator();

  const { wellFormed, validDomain, validMailbox } = await emailValidator.verify(req.body.post);

  res.send(
    
    `wellformed = ${wellFormed}, validDomain = ${validDomain}, validMailbox = ${validMailbox}`,
    )
  }
  
  //Verifies bulk domains
const bulkDomainVerifier = async(req, res, next) => {
  
  var verifiedDom;
  var unverifiedDom;

  verify.verifyDomainsMX(domains).then(function(res) {

    verifiedDom = res["verified"].toString();
    unverifiedDom = res["unverified"].toString();
});
  res.send(

    `Verified Domains = ${verifiedDom}, UnVerified Domains = ${unverifiedDom}`,
    )
  }
  
  //Verifies bulk emails
const bulkEmailVerifier = async(req, res, next) => {
  
  var verifiedM;
  var unverifiedM;

   verify.verifyEmails(domain, emails, {}, function(err, data){
      console.log("Email Stats: ", err, data); 
      verifiedM = data["verified"].toString();
      unverifiedM = data["unverified"].toString(); 
  });

  res.send(

    `Verified Mails = ${verifiedM}, UnVerified Mails = ${unverifiedM}`,
    )
  }
  

module.exports.saySomething = saySomething;
module.exports.verifier = verifier;
module.exports.bulkEmailVerifier = bulkEmailVerifier;
module.exports.bulkDomainVerifier = bulkDomainVerifier;
