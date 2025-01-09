const mysql = require("mysql2");

// Config connection to MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Change this to your MySQL password
    database: "mytreesjs",
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("❌ Error de conexión a la base de datos:", err);
    } else {
        console.log("✅ Conectado a MySQL con éxito");
    }
});

module.exports = db;
