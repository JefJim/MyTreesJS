const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
 const authMiddleware = require("../public/js/auth");

// Only client users can access this route
router.get("/users", authMiddleware(0), (req, res) => {
    res.sendFile(__dirname + "/users.html");
});
// Route to register a new user
router.post("/register", userController.registerUser);
// Route to get all countries
router.get("/countries", userController.getCountries);  


module.exports = router;
