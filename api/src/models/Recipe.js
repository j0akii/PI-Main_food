const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4(),
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false
    },
    healthScore: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: true,
      }
    },
    stepByStep: {
      type: DataTypes.TEXT
    }
  },
  { timestamps: false }
  );
};
