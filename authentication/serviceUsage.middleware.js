const { dbConnect } = require('../postgres-config/db.connect')

const dns = require('dns')

module.exports = async (req, res, next) => {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    let todayDate = year + "/" + month + "/" + day;
    let queryFor = req.route.path==="/guest/email-finder" ? 
    'emailFinder' : req.route.path==="/guest/email-verifer" ? 
    'emailVerifier' : 'domainFinder'
    try {
        const client = dbConnect()
        if(!req.headers.authorization){
            dns.lookup(req.hostname, async (err, address) => {
                let user = address
                await client.query('SELECT * FROM public."ServiceUsage" WHERE "User" = $1 AND "onDate" = $2', [
                    user.toString(),
                    todayDate
                ])
                .then( async response => {
                    if( response.rows.length === 0 ){
                        console.log(response.rows)
                        let emailFinder = req.route.path==="/guest/email-finder" ? 1 : 0
                        let emailVerifier = req.route.path==="/guest/email-verifer" ? 1 : 0
                        let domainSearch = req.route.path==="/guest/domain-search" ? 1 : 0
                        await client.query('INSERT INTO public."ServiceUsage" ("User", "isAnAccount", "emailFinder", "emailVerifier", "domainFinder", "onDate") VALUES ( $1, $2, $3, $4, $5, $6 )', [
                            user, false,emailFinder ,emailVerifier , domainSearch, todayDate
                          ])
                          .then( res => {
                              next()
                            } )
                         .catch(
                             err => console.log(err)
                         )
                    }else{
                        
                        let targetUser = response.rows[0]
                        let currentTargetCount = targetUser[queryFor]
                        console.log(queryFor)
                        console.log(currentTargetCount)
                        if( currentTargetCount < 10 ){
                            await client.query(`UPDATE public."ServiceUsage" SET "${queryFor}" = $1 WHERE "User"=$2`, [
                                currentTargetCount+1,
                                targetUser.User
                            ])
                            .then( res => {
                                next()
                            })
                            .catch( err => console.log(err) )
                        }else{
                            return res.status(400).send({
                                message: 'out of limits'
                             });
                        }
                    }
                })
            } )
            
        }
    } catch {
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
  };