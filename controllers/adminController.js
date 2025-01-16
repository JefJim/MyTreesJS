const User = require("../models/user");
const Treereg = require("../models/treereg");

// Obtener todos los usuarios
exports.getStatsAdminDashboard = async (req, res) => {
    try {
        // Contar el total de usuarios
        const totalAmigos = await User.count();

        // Contar el total de árboles disponibles
        const totalArbolesDisponibles = await Treereg.count({
            where: {
                status: 'available'
            }
        });

        // Contar el total de árboles vendidos
        const totalArbolesVendidos = await Treereg.count({
            where: {
                status: 'sold'
            }
        });

        // Retornar los resultados como un objeto
        return res.status(200).json({
            success: true,
            totalAmigos,
            totalArbolesDisponibles,
            totalArbolesVendidos
        });
    } catch (err) {
        console.error("Error al obtener estadísticas:", err);
        return res.status(500).json({
            success: false,
            message: "Error al obtener estadísticas",
            error: err.message
        });
    }
};
exports.checkEmail = async (req, res) => {
    try {
        const { email } = req.query; // Obtener el email desde los query parameters
        console.log("Email recibido:", email);

        // Buscar un usuario con ese email en la base de datos
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            console.log("El correo ya está registrado");
            return res.json({ exists: true });
        } else {
            console.log("El correo no está registrado");
            return res.json({ exists: false });
        }
    } catch (error) {
        console.error("Error al buscar usuario:", error);
        return res.status(500).json({ success: false, message: "Error en el servidor" });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios", error });
    }
};

// Obtener usuario por ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuario", error });
    }
};

// Crear usuario (cliente)
exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error al crear usuario", error });
    }
};

// Crear usuario por administrador
exports.createUserByAdmin = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error al crear usuario por admin", error });
    }
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        await user.update(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar usuario", error });
    }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        await user.destroy();
        res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar usuario", error });
    }
};
