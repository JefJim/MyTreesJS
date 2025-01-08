const express = require('express');
const router = express.Router();
const { authenticate } = require('../controllers/authController');

// Ruta de login
router.post('/login', authenticate);

module.exports = router;
