const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/register_controllers');
const logncontrollers = require('./../controllers/login_controllers');
const auth = require('../authentication/auth');


router.post('/register', controllers.register);
router.get('/verification', controllers.verification);
router.post('/login', logncontrollers.login);
router.post('/login-with-token', logncontrollers.verifyToken);


module.exports = router;