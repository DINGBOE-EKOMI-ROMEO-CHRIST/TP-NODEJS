import express from 'express';
import users from '../Controllers/UsersController.mjs';
import projecteur from '../Controllers/ProjectorController.mjs';
import reservation from '../Controllers/ReservationController.mjs';
import myMiddlewares from '../middlewares/authMiddleware.mjs';

const router = express.Router();

// === Gestion des utilisateurs ===
router.get('/users/', 
    myMiddlewares.verificationToken, 
    myMiddlewares.checkRole(['admin']), 
    users.index
);

router.get('/users/:UserId', 
    myMiddlewares.verificationToken, 
    myMiddlewares.checkRole(['admin']), 
    users.show
);

router.post('/users/register', users.register);
router.post('/users/login', users.login);

// Route de mise à jour de l'utilisateur
router.put('/users/update/:UserId', 
    myMiddlewares.verificationToken, 
    myMiddlewares.checkRole(['admin']),
    //myMiddlewares.checkSelfModification,  // Vérifie si l'utilisateur peut modifier son propre compte
    users.update
);

// Route de suppression de l'utilisateur
router.delete('/users/delete/:UserId', 
    myMiddlewares.verificationToken, 
    myMiddlewares.checkRole(['admin']),
    //myMiddlewares.checkSelfModification,  // Vérifie si l'utilisateur peut supprimer son propre compte
    users.destroy
);

// === Gestion des projecteurs ===
router.post('/projectors', 
    myMiddlewares.verificationToken, 
    myMiddlewares.checkRole(['admin', ]), 
    projecteur.register
);
router.get('/projectors', projecteur.index);
//router.get('/projectors/:ProjectorId', projecteur.show);
router.put('/projectors/:ProjectorId', 
    myMiddlewares.verificationToken, 
    myMiddlewares.checkRole(['admin',]), 
    projecteur.update
);
router.delete('/projectors/:ProjectorId', 
    myMiddlewares.verificationToken, 
    myMiddlewares.checkRole(['admin']), 
    projecteur.destroy
);

// === Gestion des réservations ===
router.post('/reservations', 
    myMiddlewares.verificationToken, 
    myMiddlewares.checkRole(['admin', 'student', 'teacher']), 
    reservation.reserver
);
router.get('/reservations', 
    myMiddlewares.verificationToken, 
    myMiddlewares.checkRole(['admin', 'student', 'teacher']), 
    reservation.index
);
router.delete('/reservations/:ReservationId', 
    myMiddlewares.verificationToken, 
    myMiddlewares.checkRole(['admin', 'student', 'teacher']), 
    reservation.destroy
);

export default router;
