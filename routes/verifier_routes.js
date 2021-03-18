const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/verifier_controllers');
const auth = require('../authentication/auth');

router.get('/say-something', auth,controllers.saySomething);
router.post('/verifier',auth,controllers.verifier);
router.post('/bulkEmailVerifier', auth,controllers.bulkEmailVerifier);
router.post('/bulkDomainVerifier', auth,controllers.bulkDomainVerifier);
router.post('/bulkverifier', auth,controllers.bulkverifier);

module.exports = router;