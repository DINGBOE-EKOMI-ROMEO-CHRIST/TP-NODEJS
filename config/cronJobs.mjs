import cron from "node-cron"; 
import Projector  from "../Models/ProjectorModel.mjs"; 
import  ReservationModel  from "../Models/ReservationModel.mjs";
import { Op } from "sequelize";
import moment from "moment-timezone";


cron.schedule("* * * * *", async () => {
    //mettre a GMT+1
    const currentTimeInCotonou = moment.tz("Africa/Porto-Novo").format("YYYY-MM-DD HH:mm:ss");
    console.log("Heure actuelle à Cotonou (GMT+1) : ", currentTimeInCotonou);

    console.log("Vérification des réservations expirées...");

    const now = new Date();

    // trouver les réservations expirées
    const reservationsExpirees = await ReservationModel.findAll({
        where: {
            Heure_fin_reservation: { [Op.lte]: now } 
        }
    });

    for (const reservation of reservationsExpirees) {
        await Projector.update(
            { Disponibilite: true },
            { where: { id_Projecteur: reservation.id_Projecteur } }
        );
        console.log(`Projecteur ${reservation.id_Projecteur} est maintenant disponible.`);
    }

    // suppression des réservations expirées si nécessaire
    await ReservationModel.destroy({
        where: {
            Heure_fin_reservation: { [Op.lte]: now }
        }
    });

    console.log("Mise à jour terminée.");
}, {
    scheduled: true,
    timezone: "Africa/Porto-Novo"
});

