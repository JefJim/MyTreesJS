const bcrypt = require("bcryptjs");
const User = require("../models/user"); 
const Country = require("../models/countries");

const signupController = {
    // Controller to register a new user
    registerUser: async (req, res) => {
        const { firstname, lastname, phone, email, address, country, password } = req.body;

        // Validate all info is complete
        if (!firstname || !lastname || !phone || !email || !address || !country || !password) {
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
                phone, 
                email, 
                address, 
                country, 
                password: hashedPassword 
            });

            return res.status(201).json({ success: true, message: "Usuario registrado con éxito" });
        } catch (err) {
            console.error("Error al registrar el usuario:", err);
            return res.status(500).json({ success: false, message: "Error en el servidor" });
        }
    },

    // Controller to get all countries
    getCountries: async (req, res) => {
        try {
            const countries = await Country.findAll();
            return res.json(countries);
        } catch (err) {
            console.error("Error al obtener los países:", err);
            return res.status(500).json({ message: "Error al obtener los países" });
        }
    }
};

module.exports = signupController;
