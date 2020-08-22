const express = require('express');

const router = express.Router();
const { authController } = require('../controller');
const { jwtMiddleware } = require('../middlewares');
var session_store;

const auth = require('../controller/authController');

const {
  getUser,
  getAllUser,
  registerUser,
  loginUser,
  updateUser,
  logout
} = authController;



const { indexLogin, indexRegister } = auth;

router.get('/users', jwtMiddleware, getAllUser);


router.get('/login', indexLogin);
router.get('/register', indexRegister);

router.post('/actionregister', registerUser);
router.post('/actionlogin', loginUser);

module.exports = router;
