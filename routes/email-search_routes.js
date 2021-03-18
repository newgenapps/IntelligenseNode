const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/email-search_controllers');
const auth = require('../authentication/auth');

router.post('/single-search',auth, controllers.singleSearch);
router.post('/domain-search',auth, controllers.domainSearch);
router.post('/bulk-search', auth,controllers.bulkSearch);


module.exports = router;