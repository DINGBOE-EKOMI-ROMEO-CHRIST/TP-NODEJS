import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('nodedatabase', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

const Projector = sequelize.define("Projecteur", {
     id_projecteur: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
     },
    nom_Projecteur: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Disponibilite: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    } 
},{
    timestamps:true,
});

export default Projector;