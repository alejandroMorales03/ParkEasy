const { Client } = require('pg');

const dbConfig = {
  user: 'AlejandroMorales',
  password: 'Ihoenys2024*',
  host: 'parkeasy.postgres.database.azure.com',
  port: 5432,
  database: 'ParkEasyAz',
  ssl: true
};

const db = new Client(dbConfig);

db.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Error connecting to PostgreSQL database', err));

module.exports = db;
