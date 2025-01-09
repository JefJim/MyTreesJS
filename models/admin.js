const db = require("../config/db");

const Dashboard = {
    getStats: (callback) => {
        const sql = `
            SELECT 
                (SELECT COUNT(*) FROM user) AS totalAmigos,
                (SELECT COUNT(*) FROM treereg WHERE status = 'available') AS totalArbolesDisponibles,
                (SELECT COUNT(*) FROM treereg WHERE status = 'sold') AS totalArbolesVendidos;
        `;

        db.query(sql, (err, results) => {
            if (err) return callback(err, null);
            return callback(null, results[0]); // Retornamos la primera fila con los valores
        });
    }
};

module.exports = Dashboard;
    