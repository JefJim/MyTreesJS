//Countries model
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Conexión a la BD

const Country = sequelize.define("countries", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "countries",
    timestamps: false
});

module.exports = Country;
