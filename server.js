import bodyParser from "body-parser";
import express from "express"
import {dirname} from "path"
import {fileURLToPath} from "url"
import pg from  "pg"
import bcrypt from "bcrypt"


const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;
const saltRounds = 10;


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}))

const db = new pg.Client({
    user: 'AlejandroMorales',
    password: 'Ihoenys2024*',
    host: 'parkeasy.postgres.database.azure.com',
    port: 5432,
    database: 'ParkEasyAz',
    ssl: true 
});

db.connect();


app.get("/signup", (req, res)=>{
    res.render(__dirname + "/views/signup.ejs")
})
app.get("/", (req, res)=>{
    res.render(__dirname + "/views/login.ejs"); 
})



app.post('/', async (req, res) => {
    const email = req.body.email;
    const loginPassword = req.body.password;

    try{
        const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if(checkResult.rows.length > 0){
            const storedPassword = checkResult.rows[0].password;
            bcrypt.compare(loginPassword, storedPassword, (err, result) =>{
                if(err)
                    console.log("Error comparing passwords: ", err)
                else{
                    if(result){
                        res.render(__dirname + "/views/home.ejs");
                    }
                    else{
                        res.render(__dirname + "/views/login.ejs", {error: "Invalid Password"});
                    }
                }
            })
        }
        else{
            res.render(__dirname + "/views/login.ejs", {error: "No Account Associated with that Email"});
        }
    }catch(error){
        console.error("Error occured when trying to login");
    }
});


app.post('/signup', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const first = req.body.first;
    const last = req.body.last;

    try {
        const checkResult = await db.query(`SELECT * FROM users WHERE users.email = $1`, [email]);

        if (checkResult.rows.length > 0) {
            res.render(__dirname + "/views/signup.ejs", { error: "This email is already associated with an account" });
        } else {
            bcrypt.hash(password, saltRounds, async (err, hash) =>{
                if(err)
                    console.log("Error hashing: ", err);
                else{
                    const result = await db.query('INSERT INTO users VALUES ($1, $2, $3, $4)', [first, last, email, password]);
                    console.log(result);
                    res.render(__dirname + "/views/home.ejs");
                }

            })
            
        }
    } catch (error) {
        console.error('Error checking email existence:', error);
        res.render(__dirname + "/views/login.ejs", { error: "An error occurred. Please try again later." });
    }

    
});

app.listen(3000);