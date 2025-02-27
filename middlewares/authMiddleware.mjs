 import jwt from 'jsonwebtoken';
 import dotenv from 'dotenv';
 dotenv.config(); 

//require('dotenv').config();

// Middleware pour vérifier le token de l'utilisateur
class Middlewares{
 verificationToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Vérification du token 
    if (!authHeader || !authHeader.startsWith('Bearer ')) { 
        return res.status(401).json({ message: 'Accès non autorisé. Aucun token fourni !' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_KEY); // Correction ici
        req.user = decodedToken;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Accès non autorisé. Token invalide ou expiré !' });
    }
};

// Middleware pour vérifier le rôle de l'utilisateur
  checkRole = (roles) => { 
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: "Accès non autorisé. Vous n'avez pas les droits pour effectuer cette action !" 
            });
        }
        next();
    };
};

 // Vérifie que l'utilisateur tente d'effectuer une action sur son propre compte
 /*checkSelfModification = (req, res, next) => {
    const userId = req.params.UserId;

    // Permet à l'utilisateur de se modifier ou de se supprimer lui-même
    if (req.user.id === parseInt(userId)) {
      return next(); // L'utilisateur peut se modifier ou se supprimer
    }

    return res.status(403).json({
      message: "Vous ne pouvez pas effectuer cette action sur un autre utilisateur.",
    });
  };*/

}
const myMiddlewares = new Middlewares();
export default myMiddlewares;
//module.exports = { verificationToken, checkRole };
