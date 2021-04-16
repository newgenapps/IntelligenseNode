const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/tech-finder_controllers');
const auth = require('../authentication/auth');

router.post('/tech-Search',auth, controllers.technologySearch);
router.post('/get-technologies',auth, controllers.getTechnologies);
module.exports = router;