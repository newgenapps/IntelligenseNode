const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/email-search_controllers');

router.post('/single-search', controllers.singleSearch);


module.exports = router;