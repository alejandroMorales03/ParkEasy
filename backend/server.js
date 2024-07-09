import express from 'express'
import dotenv from 'dotenv'
import db from './config/db.js'
import ScrapingJob from './services/scraper.js';
import authentication from './Routes/authRoutes.js';


dotenv.config();

const app = express();
const port  = process.env.SERVER_PORT

app.use(express.json());

ScrapingJob.start();


app.use('/authentication', authentication)



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });




