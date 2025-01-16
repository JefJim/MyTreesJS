const { Sequelize } = require("sequelize");

// Adding sequalize instance
const sequelize = new Sequelize("mytreesjs", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: false, // Opcional logs
});

// Test connection
sequelize.authenticate()
    .then(() => console.log("✅ Conectado a MySQL con Sequelize"))
    .catch(err => console.error("❌ Error de conexión a MySQL:", err));

module.exports = sequelize;
