import express from 'express';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import config from './config/config.js';
import './utils/clearExpiredRows.js'

const app = express();

//Connect to database
connectDB();

app.use(express.json());


//Handles routes related to credentials 
app.use('/api/auth', authRoutes);

const PORT = config.server.port || 8000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
