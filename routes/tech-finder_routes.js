const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/tech-finder_controllers');

router.post('/technologySearch', controllers.technologySearch);

module.exports = router;