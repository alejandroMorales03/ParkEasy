import bodyParser from "body-parser";
import { dir, error } from "console";
import express from "express"
import {dirname} from "path"
import {fileURLToPath} from "url"
import pg from  "pg"
import bcrypt from "bcrypt"

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;
const saltRounds = 10;

const db = new pg.Client({
    user: "postgres",
    password: "7865768083Aa*",
    host: "localhost",
    port: "5432"}
)

db.connect();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}))

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
            const storedPassword = checkResult.rows[0].hash;
            bcrypt.compare(loginPassword, storedPassword, (err, result) =>{
                if(err)
                    console.log("Error comparing passwords: ", err)
                else{
                    if(result){
                        res.render("home.ejs");
                    }
                    else{
                        res.render("login.ejs", {error: "Invalid Password"});
                    }
                }
            })
        }
        else{
            res.render("login.ejs", {error: "No Account Associated with that Email"});
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
            res.render("signup.ejs", { error: "This email is already associated with an account" });
        } else {
            bcrypt.hash(password, saltRounds, async (err, hash) =>{
                if(err)
                    console.log("Error hashing: ", err);
                else{
                    const result = await db.query('INSERT INTO users VALUES ($1, $2, $3, $4)', [first, last, email, hash]);
                    console.log(result);
                    res.render('home.ejs');
                }

            })
            
        }
    } catch (error) {
        console.error('Error checking email existence:', error);
        res.render("signup.ejs", { error: "An error occurred. Please try again later." });
    }

    
});

app.listen(3000);