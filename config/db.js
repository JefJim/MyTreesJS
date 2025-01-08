const mysql = require("mysql2");

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Deja vacío si no configuraste una contraseña
    database: "mytreesjs",
});

// Conectar a MySQL
db.connect((err) => {
    if (err) {
        console.error("❌ Error de conexión a la base de datos:", err);
    } else {
        console.log("✅ Conectado a MySQL con éxito");
    }
});

module.exports = db;
