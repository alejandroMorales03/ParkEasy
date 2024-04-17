import bodyParser from "body-parser";
import  express from "express"


const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, () =>{
    console.log("Server running on port 3000");
})


