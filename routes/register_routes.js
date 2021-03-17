const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/register_controllers');
const logncontrollers = require('./../controllers/login_controllers');
const auth = require('../auth');


router.post('/register', controllers.register);
router.get('/verification', auth,controllers.verification);
router.post('/login', logncontrollers.login);


module.exports = router;