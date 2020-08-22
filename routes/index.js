const express = require('express');


const router = express.Router();
const dashboard = require('../controller/dashboard.controller');
const product = require('../controller/product.controller');


const { indexDashboard } = dashboard;
const { indexProduct } = product;

const { addProduct } = product;

router.get('/dashboard', indexDashboard);

router.get('/product', indexProduct);
router.post('/addProduct', addProduct);

module.exports = router;

