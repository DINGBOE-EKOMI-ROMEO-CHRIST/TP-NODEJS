import { createServer } from 'http';
import './config/db.cjs';
import express from 'express';
import cors from 'cors';
import userRoutes from './Routes/userRoutes.mjs';
import users from './Controllers/UsersController.mjs';

const app = express();
app.use(cors()); 
app.use(express.json());
app.use('/api/v1/users', userRoutes)

app.listen(3000, '127.0.0.1', () => {
  console.log('serveur en ecoute sur le port 3000');
});


;
