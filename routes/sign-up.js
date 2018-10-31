var express = require('express');
var router = express.Router();

var userController = require('../controllers/user-controller.js');

/* GET sign up page. */
router.get('/', userController.createUserGet);
router.post('/', userController.createUserPost);

module.exports = router;
