import express from 'express';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

connectDB();

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
