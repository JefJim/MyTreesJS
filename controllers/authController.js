const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.authenticate = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Faltan datos" });
    }

    User.findOne(email, (err, user) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Error en el servidor" });
        }

        if (!user) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }

        // Verifica la contraseña
        bcrypt.hash(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ success: false, message: "Error al verificar la contraseña" });

            if (!isMatch) {
                return res.status(401).json({ success: false, message: "Contraseña incorrecta" });
            }

            res.json({ success: true, message: "Login exitoso", user: { id: user.id, email: user.email, isAdmin: user.rol_id === 1 } });
        });
    });
};

