const User = require("../models/user");
const Treereg = require("../models/treereg");
const bcrypt = require("bcryptjs");

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


exports.createUserByAdmin = async (req, res) => {
    const { firstname, lastname, phone, email, address, country_id, rol_id, password } = req.body;

    // Validate all info is complete
    if (!firstname || !lastname || !phone || !email || !address || !country_id || !rol_id || !password) {
        return res.status(400).json({ success: false, message: "Todos los campos son obligatorios" });
    }

    try {
        // Verify if email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "El correo ya está registrado" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        await User.create({ 
            firstname, 
            lastname, 
            email, 
            phone, 
            address, 
            country_id: parseInt(country_id),
            rol_id: parseInt(rol_id),
            password: hashedPassword 
        });

        return res.status(201).json({ success: true, message: "Usuario registrado con éxito" });
    } catch (err) {
        console.error("Error al registrar el usuario:", err);
        return res.status(500).json({ success: false, message: "Error en el servidor" });
    }
};

// update user
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

// delete user
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

//get all trees
exports.getAllTrees = async (req, res) => {
    try {
        const trees = await Treereg.findAll();
        res.status(200).json(trees);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener árboles", error });
    }
};

//delete tree
exports.deleteTree = async (req, res) => {
    try {
        const tree = await Treereg.findByPk(req.params.id);
        if (!tree) return res.status(404).json({ message: "Árbol no encontrado" });

        await tree.destroy();
        res.status(200).json({ message: "Árbol eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el árbol", error });
    }
};

