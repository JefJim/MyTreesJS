const db = require("../config/db");
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");

// Controlador para registrar usuarios

// Controlador para registrar usuarios
exports.registerUser = (req, res) => {
    const { firstname, lastname, phone, email, address, country, password } = req.body;

    if (!firstname || !lastname || !phone || !email || !address || !country || !password) {
        return res.status(400).json({ success: false, message: "Todos los campos son obligatorios" });
    }

    // Buscar si el usuario ya existe
    User.findOne(email, (err, existingUser) => {
        if (err) {
            console.error("Error al buscar usuario:", err);
            return res.status(500).json({ success: false, message: "Error en el servidor" });
        }

        if (existingUser) {
            return res.status(400).json({ success: false, message: "El correo ya está registrado" });
        }

        // Hashear la contraseña antes de guardarla
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error("Error al encriptar contraseña:", err);
                return res.status(500).json({ success: false, message: "Error en el servidor" });
            }

            // Crear el usuario
            User.create({ firstname, lastname, phone, email, address, country, password: hashedPassword }, (err, result) => {
                if (err) {
                    console.error("Error al crear usuario:", err);
                    return res.status(500).json({ success: false, message: "Error en el servidor" });
                }

                res.status(201).json({ success: true, message: "Usuario registrado con éxito" });
            });
        });
    });
};
// Obtener la lista de países desde la base de datos
exports.getCountries = (req, res) => {
    db.query("SELECT * FROM countries", (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error al obtener los países" });
        }
        res.json(results);
    });
};
