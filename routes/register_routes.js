const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/register_controllers');
const logncontrollers = require('./../controllers/login_controllers');


router.post('/register', controllers.register);
router.post('/login', logncontrollers.login);


module.exports = router;