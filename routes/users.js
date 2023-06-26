var express = require('express');
var router = express.Router();

const userCtrl = require('../controllers/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signUp', userCtrl.createUser);
router.get('/allUser', userCtrl.allUser);
router.post('/login', userCtrl.logins);

module.exports = router;
