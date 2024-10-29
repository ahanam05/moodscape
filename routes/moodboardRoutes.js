const express = require('express');
const router = express.Router();
const moodboardController = require('../controllers/moodboardController');
const { requireAuth, checkUser, noCache } = require('../middleware/authMiddleware');

//routes to open the 'create new moodboard' page and save to database
router.get('/moodboard/create', noCache, requireAuth, checkUser, moodboardController.getCreatePage);
router.post('/moodboard/create', noCache, requireAuth, checkUser, moodboardController.createMoodboard);

//routes to get a moodboard page, update and delete a moodboard
router.get('/moodboard/:id', noCache, requireAuth, checkUser, moodboardController.getMoodboard);
router.put('/moodboard/:id', noCache, requireAuth, checkUser, moodboardController.updateMoodboard);
router.delete('/moodboard/:id', noCache, requireAuth, checkUser, moodboardController.deleteMoodboard);

module.exports = router;