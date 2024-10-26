const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');

router.get('/dashboard', requireAuth, checkUser, dashboardController.dashboard_get);

module.exports = router;