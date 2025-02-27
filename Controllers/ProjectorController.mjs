import { BOOLEAN } from 'sequelize';
import ProjectorModel from '../Models/ProjectorModel.mjs';

class Projector{

    // fonction pour enregistrer un projecteur
    register = async(req, res) =>{
        const {nom_Projecteur, Disponibilite} = req.body

        // la condition !== "boolean" s'assure que disponibilite soit un boolean car sans cette condition le if nous renvoie false et le code ne s'execute pas 
        if(!nom_Projecteur || typeof Disponibilite !== "boolean" ) return res.status(400).json("tous les champs sont requis");

        const newProjecteur = await ProjectorModel.create({
            nom_Projecteur,
            Disponibilite,
        })
        return res.status(201).json({ message: "Projecteur créé avec succès", projecteur: newProjecteur });
    }

    // fonction pour lister les projecteurs
    index = async(req, res) =>{
        try{
            const Projectors = await ProjectorModel.findAll();
            res.status(200).json(Projectors);
        }catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    }
    
    // fonction pour modifier etat d'un projecteur
    update = async(req, res) => {
        try{
            const ProjectorId = req.params.ProjectorId;

            const { nom_Projecteur, Disponibilite} = req.body;

            const Projector = await ProjectorModel.findByPk(ProjectorId);

            if (!Projector) {
                return res.status(404).json("Projecteur non trouvé");
            }
    
            if (nom_Projecteur) Projector.nom_Projecteur = nom_Projecteur;
            if (Disponibilite) Projector.Disponibilite = Disponibilite;
        
            await Projector.save();
    
            res.status(200).json({ message: "Projecteur mis à jour avec succès", projecteur: Projector });
        }catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    }

    // fonction pour afficher un projecteur
   /* show = async(req, res) => {
        try{
            const ProjectorId = req.params.ProjectorId;
            const Projector = await ProjectorModel.findByPk(ProjectorId);

            if (!Projector) {
                return res.status(404).json("projecteur non trouvé");
            }
            res.status(200).json(Projector);
        }catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    }*/

    // supprimer un projecteur
    destroy = async(req, res) => {
        try{
            const ProjectorId = req.params.ProjectorId;
            const Projector = await ProjectorModel.findByPk(ProjectorId);
    
            if (!Projector) {
                return res.status(404).json("projecteur non trouvé");
            }
    
            await Projector.destroy();
            res.status(204).json({message:'projecteur supprimer'});
        }catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    }
}

const projecteur = new Projector();
export default projecteur;