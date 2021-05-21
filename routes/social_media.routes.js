const express = require('express');
const router = express.Router();
const controllers = require('../controllers/social_media_controller');


router.post('/twitter', controllers.twitterData);

module.exports = router;