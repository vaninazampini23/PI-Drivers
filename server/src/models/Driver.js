const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  // defino el modelo
  return sequelize.define('Driver', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    apellido:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imagen:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    descripcion:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    nacionalidad:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    fechadenacimiento:{
      type: DataTypes.DATEONLY,
      allowNull:false
    }
  });
};
