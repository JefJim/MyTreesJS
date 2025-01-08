const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

// Ruta para registrar usuario
router.post("/register", userController.registerUser);
// Ruta para obtener la lista de países
router.get("/countries", userController.getCountries);  
// Ruta para iniciar sesión
router.post("/login", authController.authenticate);

module.exports = router;
