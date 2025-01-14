const bcrypt = require("bcryptjs");
const Dashboard = require("../models/admin.js"); //loading stats for the dashboard

const Users = require("../models/user.js");

const adminController = {
    getDashboardStats: (req, res) => {
        Dashboard.getStats((err, stats) => {
            if (err) {
                return res.status(500).json({ success: false, message: "Error al obtener estadísticas" });
            }
            res.json({ success: true, stats });
        });
    },
    checkEmail: (req, res) => {
        const { email } = req.query; // El correo viene como query parameter
    
        // Llamamos a la función `findOne` para buscar el correo en la base de datos
        Users.findOne(email, (err, existingUser) => {
            console.log(email);
            if (err) {
                console.error("Error al buscar usuario:", err);
                return res.status(500).json({ success: false, message: "Error en el servidor" });
            }
    
            if (existingUser) {
                // Si el correo ya está registrado
                console.log("El correo ya está registrado");
                return res.json({ exists: true });
            } else {
                console.log("El correo no está registrado 2323");
                // Si el correo no está registrado
                return res.json({ exists: false });
            }
        });
    },
    getAllUsers: (req, res) => {
        Users.getAll((err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    },

    getUsersById: (req, res) => {
        const { id } = req.params;
    
        Users.getById(id, (err, result) => {
            if (err) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
            res.json(result);
        });
    },

    createUser: (req, res) => {
        const { firstname, lastname, phone, email, address, country_id, password, rol_id  } = req.body;
        if (!firstname || !lastname || !phone || !email || !address || !country_id || !rol_id || !password) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        }
        Users.findOne(email, (err, existingUser) => {
            if (err) {
                console.error("Error al buscar usuario:", err);
                return res.status(500).json({ success: false, message: "Error en el servidor" });
            }
    
            if (existingUser) {
                // Si el correo existe, se responde antes de crear el usuario
                return res.status(400).json({ success: false, message: "El correo ya está registrado" });
            }
    
            // Si el correo no está registrado, entonces procedemos a encriptar la contraseña
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    console.error("Error al encriptar contraseña:", err);
                    return res.status(500).json({ success: false, message: "Error en el servidor" });
                }
    
                // Crea el nuevo usuario
                Users.createByAdmin({ firstname, lastname, phone, email, address, country_id, rol_id, password: hashedPassword }, (err, result) => {
                    if (err) {
                        console.error("Error al crear usuario:", err);
                        return res.status(500).json({ success: false, message: "Error en el servidor" });
                    }
    
                    res.status(201).json({ success: true, message: "Usuario registrado con éxito" });
                });
            });
        });
    },
    updateUser: (req, res) => {
        const { id } = req.params;
        const { firstname, lastname, phone, email, address, country_id, password, rol_id } = req.body;
        if (!firstname || !lastname || !phone || !email || !address || !country_id || !rol_id || !password) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        }
        bcrypt.hash(password, 10, (err, hashedPassword) => {
           
            if (err) {
                console.error("Error al encriptar contraseña:", err);
                return res.status(500).json({ success: false, message: "Error en el servidor" });
            }
            // Create the new user
            Users.update(id, { firstname, lastname, phone, email, address, country_id, password: hashedPassword, rol_id }, (err, result) => {
                if (err) {
                    console.error("Error al actualizar al usuario:", err);
                    return res.status(500).json({ success: false, message: "Error en el servidor" });
                }

                res.status(201).json({ success: true, message: "Usuario actualizado con éxito" });
            });
        });
    },

    deleteUser: (req, res) => {
        const { id } = req.params;
    
        Users.delete(id, (err, result) => {
            if (err) {
                return res.status(404).json({ message: err.message || "Error al eliminar al usuario" });
            }
            return res.json(result);
        });
    }
};

module.exports = adminController;
