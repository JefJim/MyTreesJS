const express = require("express");
const router = express.Router();
const authMiddleware = require("../public/js/auth");
const adminController = require("../controllers/adminController");
const speciesController = require("../controllers/speciesController");


// Only admin users can access this route
router.get("/admin", authMiddleware(1), (req, res) => {
    res.sendFile(__dirname + "/admin.html");
});

// Route to get info for dash
router.get("/stats", adminController.getDashboardStats);  

//routes for species
router.put("/update/:id", speciesController.updateSpecies);
router.delete("/species/:id", speciesController.deleteSpecies);
router.post("/create", speciesController.createSpecies);
router.get("/list", speciesController.getAllSpecies);
router.get("/get/:id", speciesController.getSpeciesById);  

module.exports = router;
