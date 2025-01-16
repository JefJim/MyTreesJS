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
router.get("/stats", adminController.getStatsAdminDashboard);  

//routes for species
router.put("/update/:id", speciesController.updateSpecies);
router.delete("/species/:id", speciesController.deleteSpecies);
router.post("/create", speciesController.createSpecies);
router.get("/species/list", speciesController.getAllSpecies);
router.get("/get/:id", speciesController.getSpeciesById);  

//routes for control users/clients
router.get("/users/get/:id", adminController.getUserById);
router.get("/users/list", adminController.getAllUsers);
router.post("/users/create", adminController.createUserByAdmin);
router.put("/users/edit/:id", adminController.updateUser);
router.delete("/users/delete/:id", adminController.deleteUser);

//routes for trees
router.get("/trees/list", adminController.getAllTrees);

router.delete("/trees/delete/:id", adminController.deleteTree);





module.exports = router;
