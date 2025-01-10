const db = require("../config/db");

const Species = {
    getAll: (callback) => {
        const sql = "SELECT * FROM trees";
        db.query(sql, (err, results) => {
            if (err) return callback(err, null);
            return callback(null, results);
        });
    },

    getById: (id, callback) => {
        const sql = "SELECT * FROM trees WHERE id = ?";
        db.query(sql, [id], (err, results) => {
            if (err) return callback(err, null);
            return callback(null, results[0]);
        });
    },

    create: (data, callback) => {
        const sql = "INSERT INTO trees (nombre_comercial, nombre_cientifico) VALUES (?, ?)";
        db.query(sql, [data.nombre_comercial, data.nombre_cientifico], (err, results) => {
            if (err) return callback(err, null);
            return callback(null, results);
        });
    },

    update: (id, data, callback) => {
        const sql = "UPDATE trees SET nombre_comercial = ?, nombre_cientifico = ? WHERE id = ?";
        db.query(sql, [data.nombre_comercial, data.nombre_cientifico, id], (err, results) => {
            if (err) return callback(err, null);
            return callback(null, results);
        });
    },

    delete: (id, callback) => {
        const sql = "DELETE FROM trees WHERE id = ?";
        
        db.query(sql, [id], (err, results) => {
            if (err) return callback(err, null);
    
            if (results.affectedRows === 0) {
                return callback({ message: "Especie no encontrada" }, null);
            }
    
            return callback(null, { message: "Especie eliminada correctamente" });
        });
    }
};

module.exports = Species;
