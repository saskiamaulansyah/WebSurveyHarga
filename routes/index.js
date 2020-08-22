const express = require('express');


const router = express.Router();
const dashboard = require('../controller/dashboard.controller');


const { indexDashboard } = dashboard;


router.get('/dashboard', indexDashboard);


module.exports = router;

