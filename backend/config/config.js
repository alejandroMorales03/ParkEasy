import dotenv from 'dotenv';

dotenv.config();

const config = {
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_DATABASE,
    ssl: process.env.DB_SSL === 'true',
  },
  server: {
    port: process.env.PORT || 8000,  
  },
  notifier:{
    email: process.env.NOTIFICATION_EMAIL,
    password: process.env.NOTIF_EMAIL_PASS,
  }
};

export default config;
