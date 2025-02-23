import UserModel from '../Models/UserModel.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Charger les variables d'environnement

// fonction pour generer le token
const createtoken = (_id) => {
    const jwtkey = process.env.JWT_KEY;
    return jwt.sign({ _id }, jwtkey, { expiresIn: '1h' }); // Crée le token
}

class Users {

    register = async (req, res) => {
        try {
            const { name, email, password, salle } = req.body;
            let Mail = await UserModel.findOne({ where: { email } });

            if (Mail) return res.status(400).json("Cet email existe déjà");

            if (!name || !email || !password || !salle) return res.status(400).json("Tous les champs sont requis");

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await UserModel.create({
                name,
                email,
                password: hashedPassword,
                salle
            });

            return res.status(201).json({ message: "Utilisateur créé avec succès", user: newUser });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            let User = await UserModel.findOne({ where: { email } });
            if (!User) return res.status(400).json("Email incorrect");

            const isValidPassword = await bcrypt.compare(password, User.password);
            if (!isValidPassword) return res.status(400).json("Mot de passe incorrect");

            // création du token
            const token = createtoken(User.id);
            res.status(200).json({ id: User.id, name: User.name, email, token });

        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    update = async (req, res) => {
        try {
            const UserId = req.params.UserId;
            const { name, email, password, role, salle } = req.body;
    
            // Récupérer l'utilisateur par son ID
            const User = await UserModel.findByPk(UserId);
    
            if (!User) {
                return res.status(404).json("Utilisateur non trouvé");
            }
    
            if (name) User.name = name;
            if (email) User.email = email;
            if (password) {
                const salt = await bcrypt.genSalt(10);
                User.password = await bcrypt.hash(password, salt);
            }
            if (role) User.role = role;
            if (salle) User.salle = salle;
    
            await User.save();
    
            res.status(200).json({ message: "Utilisateur mis à jour avec succès", user: User });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    destroy = async(req,res) => {
        try{
            const UserId = req.params.UserId;
            const { name, email, password, role, salle } = req.body;
    
            // Récupérer l'utilisateur par son ID
            const User = await UserModel.findByPk(UserId);
    
            if (!User) {
                return res.status(404).json("Utilisateur non trouvé");
            }

            await User.destroy();
    
            res.status(200).json({ message: "Utilisateur supprimer"});
        }catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    }
    
    index = async(req, res) => {
        try{
            const Users = await UserModel.findAll();
            res.status(200).json(Users)
        }catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    }

    show = async(req, res) => {
        try{
            const UserId = req.params.UserId;
            const User = await UserModel.findByPk(UserId);
            res.status(200).json(User);
        }catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    }
}

const users = new Users();
export default users;
