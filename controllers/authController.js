const User = require("../models/user"); // Importar el modelo User
const bcrypt = require("bcryptjs");

exports.authenticate = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Faltan datos" });
        }

        // Find user with email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }

        // Verify password with bcrypt
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Contraseña incorrecta" });
        }

        // Success answer
        res.json({ 
            success: true, 
            message: "Login exitoso", 
            user: { id: user.id, email: user.email, isAdmin: user.rol_id === 1 } 
        });

    } catch (error) {
        console.error("Error en la autenticación:", error);
        res.status(500).json({ success: false, message: "Error en el servidor" });
    }
};
