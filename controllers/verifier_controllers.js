

const EmailValidator = require("./../node_modules/email-deep-validator")
const verify = require("./../node_modules/bulk-email-verifier")

var domain = 'gmail.com';
var emails = [
  'test3@gmail.com',
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
const verifier = async (req, res, next) => {

  const emailValidator = new EmailValidator();

  const { wellFormed, validDomain, validMailbox } = await emailValidator.verify(req.body.post);
  console.log(`wellformed = ${wellFormed}, validDomain = ${validDomain}, validMailbox = ${validMailbox}`)
  res.send(

    `wellformed = ${wellFormed}, validDomain = ${validDomain}, validMailbox = ${validMailbox}`,
  )
}

//Verifies bulk email Address
const bulkverifier = async (req, res, next) => {

  const emailValidator = new EmailValidator();

  const { wellFormed, validDomain, validMailbox } = await emailValidator.verify(req.body.post);
  console.log(`wellformed = ${wellFormed}, validDomain = ${validDomain}, validMailbox = ${validMailbox}`)
  const randomEmailTest = await emailValidator.verify("thiscantbeatrueemailczthisisnotatrueemail@"+req.body.post.split('@')[1]);
  const acceptAll = await randomEmailTest.validMailbox
  await console.log(randomEmailTest)
  await res.json({
    response: {
      "wellformed": wellFormed,
      "validDomain": validDomain,
      "validMailbox": validMailbox,
      "acceptAll": acceptAll
    }
  }
  )
}

//Verifies bulk domains
const bulkDomainVerifier = async (req, res, next) => {
  console.log(req.body)
  if( req.body.post ){
    if( req.body.post.length !== 0 ){
      verify.verifyDomainsMX(req.body.post).then(function (data) {
        console.log(data)
        res.json({
          response: {
            "status": 200,
            "verifiedDomains": [...data.verified],
            "unVerifiedDomains": [...data.unverified]
          }
        }
        )
      });
    }else{
      console.log("post was empty")
      res.json({
        response: {
          "status": 300,
          "message": "Empty Array"
        }
      })
    }
  }else{
    console.log("post not present")
    res.json({
      response: {
        "status": 400,
        "message": "No structured array found"
      }
    })
  }
  return ;
}

//Verifies bulk emails
const bulkEmailVerifier = async (req, res, next) => {

  verify.verifyEmails(domain, emails, {}, function(err, data) {
    if( data ){
    console.log(data)
    res.json({
      response: {
        "verifiedMails": [...data.verified],
        "unVerifiedMails": [...data.unverified]
      }
    }
    )
    }else{
      console.log( 'err ' )
    }
  });
}

//Verifies bulk email Address
const guestVerifier = async (req, res, next) => {
  console.log("Resco")
  const emailValidator = new EmailValidator();

  const { wellFormed, validDomain, validMailbox } = await emailValidator.verify(req.body.post);
  console.log(`wellformed = ${wellFormed}, validDomain = ${validDomain}, validMailbox = ${validMailbox}`)
  const randomEmailTest = await emailValidator.verify("thiscantbeatrueemailczthisisnotatrueemail@"+req.body.post.split('@')[1]);
  const acceptAll = await randomEmailTest.validMailbox
  await console.log(randomEmailTest)
  await res.json({
    response: {
      "wellformed": wellFormed,
      "validDomain": validDomain,
      "validMailbox": validMailbox,
      "acceptAll": acceptAll
    }
  }
  )
}


module.exports.saySomething = saySomething;
module.exports.verifier = verifier;
module.exports.bulkEmailVerifier = bulkEmailVerifier;
module.exports.bulkDomainVerifier = bulkDomainVerifier;

module.exports.bulkverifier = bulkverifier;
module.exports.guestVerifier = guestVerifier;
