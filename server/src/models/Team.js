const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("Team", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });
};