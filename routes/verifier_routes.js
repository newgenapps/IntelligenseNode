const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/verifier_controllers');

router.get('/say-something', controllers.saySomething);
router.post('/verifier', controllers.verifier);


module.exports = router;