const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");

// Login route
router.post("/login", authController.authenticate);

module.exports = router;