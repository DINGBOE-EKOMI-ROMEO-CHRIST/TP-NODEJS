import Projector from '../Models/ProjectorModel.mjs';
import ReservationModel from '../Models/ReservationModel.mjs';

class Reservation{

    // fonction pour reserver un projecteur
    reserver = async(req, res) => {
        try{
            //id -> id user
             const {id, id_Projecteur, id_salle, Heure_debut_reservation, Heure_fin_reservation} = req.body;

             if(!id || !id_Projecteur || !id_salle || !Heure_debut_reservation || !Heure_fin_reservation) return res.status(400).json("tous les champs sont requis");

             const newResevation = await ReservationModel.create({
                id,
                id_Projecteur,
                id_salle,
                Heure_debut_reservation,
                Heure_fin_reservation
             });
            return res.status(201).json({ message: "Reservation créé avec succès", reservation: newResevation });

        }catch(error){
            console.log(error);
            res.status(400).json(error);
        }
    }

    index = async(req, res) => {
        try{
            const reservations = await ReservationModel.findAll();
            res.status(200).json(reservations);
        }catch(error){
            console.log(error);
            res.status(400).json(error);
        }
    }

    destroy = async(req, res) =>{
        try{
            const ReservationId = req.params.ReservationId;

            const reservation = await ReservationModel.findByPk(ReservationId);
    
            if (!reservation) {
                return res.status(404).json("reservation non trouvé");
            }
    
            reservation.destroy();
            res.status(204).json({message:'projecteur supprimer'});
        }catch(error){
            console.log(error);
            res.status(400).json(error);
        }
    }
}

const reservation = new Reservation();
export default reservation;