const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');

router.use('/', authRoutes);
router.use('/home', (req, res) => res.render('home'));

module.exports = router;
