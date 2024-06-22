import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import bcrypt from "bcrypt";
import { exec } from 'child_process';
import { CronJob } from 'cron';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;
const saltRounds = 10;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = new pg.Client({
    user: 'AlejandroMorales',
    password: 'Ihoenys2024*',
    host: 'parkeasy.postgres.database.azure.com',
    port: 5432,
    database: 'ParkEasyAz',
    ssl: true
});

db.connect();

const runPythonScraper = () => {
    exec('python3 ParkingData/AvaScrapper.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing scraper: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Scraper stderr: ${stderr}`);
            return;
        }
        console.log(`Scraper stdout: ${stdout}`);
    });
};

const job = new CronJob('*/5 * * * *', () => {
    console.log('Running Python scraper...');
    runPythonScraper();
});

job.start();

app.get("/signup", (req, res) => {
    res.render(__dirname + "/views/signup.ejs")
});

app.get("/", (req, res) => {
    const { error } = req.query;
    res.render(__dirname + "/views/login.ejs", { error });
});

app.post('/', async (req, res) => {
    const { email, password, latitude, longitude } = req.body;

    try {
        const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if (checkResult.rows.length > 0) {
            const storedPassword = checkResult.rows[0].password;
            bcrypt.compare(password, storedPassword, async (err, result) => {
                if (err) {
                    console.log("Error comparing passwords: ", err);
                    res.redirect('/?error=login_error');
                } else {
                    if (result) {
                        
                        const updateResult = await db.query("UPDATE users SET lat = $1, log = $2 WHERE email = $3", [latitude, longitude, email]);
                        console.log("Latitude and longitude updated successfully");

                        res.render(__dirname + "/views/home.ejs");
                    } else {
                        res.redirect('/?error=invalid_password');
                    }
                }
            });
        } else {
            res.redirect('/?error=no_account');
        }
    } catch (error) {
        console.error("Error occurred when trying to login:", error);
        res.redirect('/?error=login_error');
    }
});

app.post('/signup', async (req, res) => {
    const { email, password, first, last, latitude, longitude } = req.body;

    try {
        const checkResult = await db.query(`SELECT * FROM users WHERE users.email = $1`, [email]);

        if (checkResult.rows.length > 0) {
            res.render(__dirname + "/views/signup.ejs", { error: "This email is already associated with an account" });
        } else {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    console.log("Error hashing: ", err);
                    res.redirect('/?error=signup_error');
                } else {
           
                    const result = await db.query('INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6)', [first, last, email, hash, latitude, longitude]);
                    console.log(result);
                    res.render(__dirname + "/views/home.ejs");
                }
            });
        }
    } catch (error) {
        console.error('Error checking email existence:', error);
        res.redirect('/?error=signup_error');
    }
});


app.listen(3000);
