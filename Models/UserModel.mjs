import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('nodedatabase', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});
const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('student', 'teacher', 'admin'),
      defaultValue: 'student',
    },
    salle: {
      type: DataTypes.INTEGER,
      allowNull: true,  
      references: {
        model: 'Salle',
        key: 'id_salle',
      },
    },
  }, {
    timestamps: true,
  });
  

export default User;
