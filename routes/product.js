const express = require('express');

const router = express.Router();
const { productController } = require('../controller');
const { jwtMiddleware } = require('../middlewares');
var session_store;

const product = require('../controller/productController');

const { indexProduct } = product;
const {
  getProduct,
  addProduct,
  changeProductStatus
} = productController;

router.get('/product', indexProduct);


router.get('/getProduct', getProduct);
router.post('/addproduct', addProduct);
router.patch('/statusproduct', changeProductStatus);


module.exports = router;
