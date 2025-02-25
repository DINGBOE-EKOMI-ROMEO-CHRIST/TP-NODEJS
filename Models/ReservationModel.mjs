import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('nodedatabase', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

const Reservation = sequelize.define("Reservation", {
    id_reservation: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', 
            key: 'id',
        },
        onDelete: 'CASCADE', 
    },
    id_Projecteur: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Projecteurs', 
            key: 'id_Projecteur',
        },
        onDelete: 'CASCADE',
    },
    id_salle: {
        type: DataTypes.INTEGER,
        allowNull: true,  
        references: {
            model: 'Salles', 
            key: 'id_salle',
        },
        onDelete: 'SET NULL', 
    },
    Heure_debut_reservation: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Heure_fin_reservation: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    timestamps: true,
});

export default Reservation;
