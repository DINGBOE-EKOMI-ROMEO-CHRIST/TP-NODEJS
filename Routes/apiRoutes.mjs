import express from 'express';
import users from '../Controllers/UsersController.mjs';
import projecteur from '../Controllers/ProjectorController.mjs';

const router = express.Router();

router.get('/users/', users.index);
router.get('/users/:UserId', users.show);
router.post('/users/register', users.register);
router.post('/users/login', users.login);
router.put('/users/update/:UserId', users.update);
router.delete('/users/delete/:UserId', users.destroy);


router.post('/projectors', projecteur.register);
router.get('/projectors', projecteur.index);
router.put('/projectors/:ProjectorId', projecteur.update);
router.delete('/projectors/:ProjectorId', projecteur.destroy);

export default router;