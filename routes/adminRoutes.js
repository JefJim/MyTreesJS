const express = require("express");
const router = express.Router();
const authMiddleware = require("../public/js/auth");
const adminController = require("../controllers/adminController");

// Only admin users can access this route
router.get("/admin", authMiddleware(1), (req, res) => {
    res.sendFile(__dirname + "/admin.html");
});

// Route to get info for dash
router.get("/admin/stats", adminController.getDashboardStats);  

module.exports = router;
