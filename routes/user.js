var express = require('express');
var router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/login', userCtrl.loginSession);

module.exports = router;