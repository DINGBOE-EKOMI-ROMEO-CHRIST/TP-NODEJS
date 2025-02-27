 import jwt from 'jsonwebtoken';
 import dotenv from 'dotenv';
 dotenv.config(); 


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
        const UserId = req.params.UserId;

      //  console.log("User ID:", req.user._id); 
      //  console.log("Requested User ID:", UserId); 
      //  console.log("User Role:", req.user.role); 

        if (req.user._id === parseInt(UserId)) {
            return next(); // L'utilisateur peut se modifier ou se supprimer
        }
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: "Accès non autorisé. Vous n'avez pas les droits pour effectuer cette action !" 
            });
        }
        next();
    };
};


}
const myMiddlewares = new Middlewares();
export default myMiddlewares;

