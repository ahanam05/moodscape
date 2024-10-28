const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const moodboardRoutes = require('./moodboardRoutes');

router.use('/', authRoutes);
router.use('/', dashboardRoutes);
router.use('/', moodboardRoutes);
router.use('/', (req, res) => res.render('home'));

module.exports = router;
