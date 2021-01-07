const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/verifier_controllers');

router.get('/say-something', controllers.saySomething);
router.post('/verifier', controllers.verifier);
router.post('/bulkEmailVerifier', controllers.bulkEmailVerifier);
router.post('/bulkDomainVerifier', controllers.bulkDomainVerifier);

module.exports = router;