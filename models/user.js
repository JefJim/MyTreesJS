const db = require("../config/db");

const User = {
    findOne: (email, callback) => {
        const sql = "SELECT * FROM user WHERE email = ?";
        db.query(sql, [email], (err, results) => {
            if (err) {
                console.error("Error en la consulta SQL:", err);
                return callback(err, null);
            }
            return callback(null, results.length > 0 ? results[0] : null); 
        });
    },

    create: (userData, callback) => {
        const sql = "INSERT INTO user (firstname, lastname, phone, email, address, country_id, rol_id, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(sql, 
            [userData.firstname, userData.lastname, userData.phone, userData.email, userData.address, userData.country, 2, userData.password], //rol_id 2 = user
            (err, results) => {
                if (err) {
                    console.error("Error al crear usuario:", err);
                    return callback(err, null);
                }
                return callback(null, results);
            }
        );
    }
};

module.exports = User;
