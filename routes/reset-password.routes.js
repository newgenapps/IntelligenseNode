const express = require('express');
const router = express.Router();
const controllers = require('../controllers/reset-password.controllers');


router.post('/reset-password', controllers.resetPasswordReqhandler);
router.post('/new-password', controllers.resetPassword);

module.exports = router;