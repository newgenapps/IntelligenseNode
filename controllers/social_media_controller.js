// twitterData
const Twit = require('twit')

const T = new Twit({
    consumer_key: 'Lue1hBcMB7ArXJ0gLstSeKO5K',
    consumer_secret: 'VMMjQsb22B08Bgy9ySskp8jovlrK2ZYFIg0c2AadLckiV3f6dw',
    access_token: '24855295-iRogDd6cxgZJgGhYGAsfPrwXvFtxjXxwMIOD5Mtdh',
    access_token_secret: 'dgduFzAOLUJtjzxaU8aGQPyn7VGHXN1YbHyoalzDDHDiz',
});

const twitterData = async (req, res, next) => {
    T.get('search/tweets', { q: req.body.details.keyword, count: req.body.details.outputSize }, function (err, data, response) {
        if (!err) {
            const tweets = data.statuses
                // .map(tweet => `LANG: ${franc(tweet.text)} : ${tweet.text}`) //CHECK LANGUAGE

                .map(tweet => tweet.text)
            res.status(200).json({
                msg: tweets
            });
        } else {
            console.log(err)
            res.status(404).json({
                msg: "Error on Server Twitter api calling"
            })
        }
    })
}
// TWITTER FN ENDS

module.exports.twitterData = twitterData