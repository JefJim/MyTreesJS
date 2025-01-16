const express = require("express");
const router = express.Router();
const authMiddleware = require("../public/js/auth");
const adminController = require("../controllers/adminController");
const speciesController = require("../controllers/speciesController");
const usersController = require("../controllers/clientController");


// Only admin users can access this route
router.get("/admin", authMiddleware(1), (req, res) => {
    res.sendFile(__dirname + "/admin.html");
});

// Route to get info for dash
router.get("/stats", adminController.getStatsAdminDashboard);  

//routes for species
router.put("/update/:id", speciesController.updateSpecies);
router.delete("/species/:id", speciesController.deleteSpecies);
router.post("/create", speciesController.createSpecies);
router.get("/species/list", speciesController.getAllSpecies);
router.get("/get/:id", speciesController.getSpeciesById);  

//routes for users
router.get("/users/get/:id", adminController.getUserById);
router.get("/users/check-email", adminController.checkEmail);

router.get("/users/list", adminController.getAllUsers);
router.post("/users/create", adminController.createUser);
router.put("/users/edit/:id", adminController.updateUser);
router.delete("/users/delete/:id", adminController.deleteUser);



module.exports = router;
