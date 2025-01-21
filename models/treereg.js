const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Conexión a la BD

const TreeReg = sequelize.define("treereg", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tree_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    species: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ubication: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING("available", "sold"),
        allowNull: false,
        defaultValue: "available"
    },
    
    imageurl: {
        type: DataTypes.STRING, // URL de la imagen
        allowNull: true
    },
    date: {
        type: DataTypes.DATE, // date
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: "treereg"
});

module.exports = TreeReg;
