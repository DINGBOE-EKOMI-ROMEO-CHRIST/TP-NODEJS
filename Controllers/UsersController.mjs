import UserModel from '../Models/UserModel.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); 

// fonction pour générer le token
const createtoken = (_id, role) => {
    const jwtkey = process.env.JWT_KEY;
    return jwt.sign({ _id, role }, jwtkey, { expiresIn: '1h' });
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
            const token = createtoken(User.id, User.role);
            res.status(200).json({ id: User.id, name: User.name, role: User.role, email, token });

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

             // Vérification si l'utilisateur est en train de modifier son propre compte ou si c'est un admin
            if (req.user.id !== User.id && req.user.role !== 'admin') {
                return res.status(403).json({ message: "Vous ne pouvez pas modifier un autre utilisateur." });
            }

            // Vérification du rôle avant de modifier
            if (role) {
                // Si l'utilisateur actuel n'est pas un admin
                if (req.user.role !== 'admin') {
                    return res.status(403).json({ message: "Seul un admin peut changer un rôle." });
                }

                // Si on tente de donner le rôle superadmin à un utilisateur non admin
                if (role === 'admin' && User.role !== 'admin') {
                    return res.status(403).json({ message: "Impossible d'attribuer le rôle admin." });
                }

                // Si un superadmin tente de changer son propre rôle
                if (req.user.id === User.id && role !== 'admin') {
                    return res.status(403).json({ message: "Impossible de modifier votre propre rôle." });
                }

                User.role = role;
            }

            // Mise à jour des autres informations
            if (name) User.name = name;
            if (email) User.email = email;
            if (password) {
                const salt = await bcrypt.genSalt(10);
                User.password = await bcrypt.hash(password, salt);
            }
            if (salle) User.salle = salle;
    
            await User.save();
    
            res.status(200).json({ message: "Utilisateur mis à jour avec succès", user: User });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    destroy = async (req, res) => {
        try {
            const UserId = req.params.UserId;
    
            // Récupérer l'utilisateur par son ID
            const User = await UserModel.findByPk(UserId);
    
            if (!User) {
                return res.status(404).json("Utilisateur non trouvé");
            }
            if(req.user.id === User.id) {
                await User.destroy();
            return res.status(204).json({ message: "Votre compte a été supprimé avec succès." }); 
            }
            if(User.role === 'admin') {
                return res.status(403).json({ message: "Impossible de supprimer un superadmin" });
            }

            // Si ce n'est pas le superadmin et que ce n'est pas le compte de l'utilisateur connecté
        if (req.user.role === 'admin') {
            await User.destroy();
            return res.status(204).json({ message: "Utilisateur supprimé" });
        }

        // Si l'utilisateur essaie de supprimer un autre compte sans être un admin
        return res.status(403).json({ message: "Vous ne pouvez pas supprimer un autre compte." });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    index = async (req, res) => {
        try {
            const Users = await UserModel.findAll();
            res.status(200).json(Users)
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    show = async (req, res) => {
        try {
            const UserId = req.params.UserId;
            const User = await UserModel.findByPk(UserId);
            if (!User) { return res.status(404).json("Utilisateur non trouvé") };
            res.status(200).json(User);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    profile = async (req, res) => {
        try {
            const userId = req.user._id; // Récupérer l'ID à partir du token
            const user = await UserModel.findByPk(userId, {
                attributes: ['id', 'name', 'email', 'role', 'salle'] // Sélectionner uniquement les champs nécessaires
            });
    
            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }
    
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erreur serveur", error });
        }
    }
    
    
}

const users = new Users();
export default users;
