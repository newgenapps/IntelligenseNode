const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/verifier_controllers');
const auth = require('../authentication/auth');
const ServiceUsage = require('../authentication/serviceUsage.middleware.js')

router.get('/say-something', controllers.saySomething);
router.post('/verifier',auth,controllers.guestVerifier);
router.post('/bulkEmailVerifier',auth, controllers.bulkEmailVerifier);
router.post('/bulkDomainVerifier',auth, controllers.bulkDomainVerifier);
router.post('/bulkverifier',auth, controllers.bulkverifier);
router.post('/guest/email-verifer',ServiceUsage, controllers.guestVerifier);

module.exports = router;