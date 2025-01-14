const express = require("express");
const router = express.Router();
const userController = require("../controllers/clientController");
const signupController = require("../controllers/signupController");

 const authMiddleware = require("../public/js/auth");

// Only client users can access this route
router.get("/users", authMiddleware(2), (req, res) => {
    res.sendFile(__dirname + "/users.html");
});
// Route to register a new user
router.post("/signup/register", signupController.registerUser);

// Route to get all countries
router.get("/signup/countries", signupController.getCountries);  



module.exports = router;
