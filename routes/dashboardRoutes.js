const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/dashboard', requireAuth, dashboardController.dashboard_get);

module.exports = router;