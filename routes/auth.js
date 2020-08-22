const express = require('express');

const router = express.Router();
const { authController } = require('../controller');
//const { jwtMiddleware } = require('../middlewares');
//var session_store;

const auth = require('../controller/authController');
const {
//   getUser,
//   getAllUser,
//   registerUser,
  loginUser
//   updateUser,
//   logout
} = authController;


const { indexLogin, indexRegister} = auth;
/* GET USER PROFILE */
//router.get('/profile/:id', jwtMiddleware, getUser);

/* GET ALL USER */
//router.get('/users', jwtMiddleware, getAllUser);


router.get('/viewLogin', indexLogin);
/* REGISTER USER */
// router.post('/register', registerUser);

/* VIEW LOGIN USER */
//router.post('/login', loginUser);

/* VIEW REGISTER USER */
//router.get('/viewRegister', indexRegister);


//router.get('/logout', logout);
/* UPDATE USER */
//router.patch('/profile/:id', jwtMiddleware, updateUser);

module.exports = router;
