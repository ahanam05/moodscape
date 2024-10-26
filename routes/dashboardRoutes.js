const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { requireAuth, checkUser, noCache } = require('../middleware/authMiddleware');

router.get('/dashboard', noCache, requireAuth, checkUser, dashboardController.dashboard_get);

module.exports = router;