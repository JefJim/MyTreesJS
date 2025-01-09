const express = require("express");
const router = express.Router();
const authMiddleware = require("../public/js/auth");

// Only admin users can access this route
router.get("/admin", authMiddleware(1), (req, res) => {
    res.sendFile(__dirname + "/admin.html");
});

module.exports = router;
