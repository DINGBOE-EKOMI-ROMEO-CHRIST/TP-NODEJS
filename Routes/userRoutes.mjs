import express from 'express';
import users from '../Controllers/UsersController.mjs';

const router = express.Router();

router.get('/', users.index);
router.get('/:UserId', users.show);
router.post('/register', users.register);
router.post('/login', users.login);
router.put('/update/:UserId', users.update);
router.delete('/delete/:UserId', users.destroy);

export default router;