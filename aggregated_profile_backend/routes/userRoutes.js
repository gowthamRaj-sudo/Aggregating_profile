const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middleware/authMiddleware');
const { loginUser, getAggregatedProfile } = require('../controllers/userController');

router.post('/auth/login', loginUser);
router.get('/users/:username/profile', authenticateToken, getAggregatedProfile);
module.exports = router;
