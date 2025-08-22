import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://app-notas-xi.vercel.app"]
})); 

app.use(express.json());

app.use("/api/notas", notesRoutes);

const PORT = process.env.PORT || 3001;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor levantado en http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error(err));
