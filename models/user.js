const db = require("../config/db");

const User = {
    findOne: (email, callback) => {
        const sql = "SELECT * FROM user WHERE email = ?";
        db.query(sql, [email], (err, results) => {
            if (err) return callback(err, null);
            return callback(null, results[0]); // Devuelve el primer usuario si existe
        });
    },
    getById: (id, callback) => {
        const sql = "SELECT * FROM user WHERE id = ?";
        db.query(sql, [id], (err, results) => {
            if (err) return callback(err, null);
            return callback(null, results[0]);
        });
    },
    create: (userData, callback) => {
        const sql = "INSERT INTO user (firstname, lastname, phone, email, address, country_id, rol_id, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(sql, 
            [userData.firstname, userData.lastname, userData.phone, userData.email, userData.address, userData.country, 1, userData.password], //rol_id 1 = client
            (err, results) => {
                if (err) {
                    console.error("Error al crear usuario:", err);
                    return callback(err, null);
                }
                return callback(null, results);
            }
        );
    },
    createByAdmin: (userData, callback) => {
        const sql = "INSERT INTO user (firstname, lastname, phone, email, address, country_id, rol_id, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(sql, 
            [userData.firstname, userData.lastname, userData.phone, userData.email, userData.address, userData.country_id, userData.rol_id, userData.password], 
            (err, results) => {
                if (err) {
                    console.error("Error al crear usuario:", err);
                    return callback(err, null);
                }
                return callback(null, results);
            }
        );
    },
    getAll: (callback) => {
        const sql = "SELECT * FROM user";
        db.query(sql, (err, results) => {
            if (err) return callback(err, null);
            return callback(null, results);
        });
    },
    update: (id, userData, callback) => {
        const sql = "UPDATE user SET firstname = ?, lastname = ?, phone = ?, email = ?, address = ?, country_id = ?, rol_id = ?, password = ? WHERE id = ?";
        db.query(sql, [userData.firstname, userData.lastname, userData.phone, userData.email, userData.address, userData.country_id, userData.rol_id, userData.password, id], (err, results) => {
            if (err) return callback(err, null);
            return callback(null, results);
        });
    },
    delete: (id, callback) => {
        const sql = "DELETE FROM user WHERE id = ?";
        
        db.query(sql, [id], (err, results) => {
            if (err) return callback(err, null);
    
            if (results.affectedRows === 0) {
                return callback({ message: "Usuario no encontrado" }, null);
            }
    
            return callback(null, { message: "Usuario eliminado correctamente" });
        });
    }

};

module.exports = User;
