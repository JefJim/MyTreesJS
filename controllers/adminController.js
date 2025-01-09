const Dashboard = require("../models/admin.js"); //loading stats for the dashboard

exports.getDashboardStats = (req, res) => {
    Dashboard.getStats((err, stats) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Error al obtener estadísticas" });
        }
        res.json({ success: true, stats });
    });
};

