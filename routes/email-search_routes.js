const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/email-search_controllers');
const auth = require('../authentication/auth');

router.post('/single-search', controllers.singleSearch);
router.post('/domain-search', controllers.domainSearch);
router.post('/bulk-search', controllers.bulkSearch);


module.exports = router;