const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Conexión a la BD

const Species = sequelize.define("Species", {
    nombre_comercial: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombre_cientifico: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: "trees",
    timestamps: false
});

module.exports = Species;
