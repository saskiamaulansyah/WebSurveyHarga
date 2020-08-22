const express = require('express');

const router = express.Router();
const { authController } = require('../controller');

const auth = require('../controller/authController');

const {
  loginUser
} = authController;


const { indexLogin } = auth;

router.get('/login', indexLogin);

module.exports = router;
