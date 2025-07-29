// index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { pool } from './db.js';
import itemRoutes from './routes/items.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
