var express = require('express');
var router = express.Router();

const userCtrl = require('../controllers/user');


router.get('/', function(req, res, next){
    res.render('pageOne',)
})
router.post('/login', userCtrl.loginSession);
router.post('/signIn', userCtrl.createUser);
router.get('/allUser', userCtrl.allUser);
module.exports = router;