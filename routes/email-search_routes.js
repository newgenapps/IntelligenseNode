const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/email-search_controllers');
const auth = require('../authentication/auth');
const ServiceUsage = require('../authentication/serviceUsage.middleware.js')

router.post('/single-search',auth, controllers.guestSingleSearch);
router.post('/domain-search',auth, controllers.domainSearch);
router.post('/bulk-search',auth, controllers.bulkSearch);
router.post('/guest/domain-search',ServiceUsage, controllers.guestDomainSearch);
router.post('/guest/email-finder',ServiceUsage, controllers.guestSingleSearch);


module.exports = router;