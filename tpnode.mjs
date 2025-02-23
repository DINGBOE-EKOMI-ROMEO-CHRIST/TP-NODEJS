import { createServer } from 'http';
import './config/db.cjs';
import express from 'express';
import cors from 'cors';
import apiRoutes from './Routes/apiRoutes.mjs';

const app = express();
app.use(cors()); 
app.use(express.json());
app.use('/api/v1', apiRoutes)

app.listen(3000, '127.0.0.1', () => {
  console.log('serveur en ecoute sur le port 3000');
});