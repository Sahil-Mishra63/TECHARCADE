const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require("./src/config");


const app = express();

//convert data into json format
app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//static file
app.use(express.static(path.join(__dirname, 'public')));

app.get("/login", (req,res) => {
    res.render("login");
});

app.get("/signup", (req,res) => {
    res.render("signup", (err, html) =>{
        if(err){
            console.error("Error", err);
            res.status(500).send("Error loading signup page");
        }
        else{
            res.send(html);
        }
    });
});

//register user

app.post("/signup", async (req, res) =>{

    try{
            const data = {
                email: req.body.email,
                password: req.body.password
            }

            //check if user already existt
            const existingUser = await collection.findOne({email: data.email});

            if(existingUser){
                res.send("User already exists. please chose another email");
            }
            // else{
            //     //hashing the password using bcrypt
            //     const saltRounds = 10;
            //     const hashedPassword = await bcrypt.hash(data.password, saltRounds);

            //     data.password = hashedPassword; //replace the original password with hashed password

            //     const userData = await collection.insertMany(data);
            //     console.log(userData);
            //     res.render("login");
            // }
            
            const hashedPassword = await bcrypt.hash(data.password, 10);

            // Store user in DB
            const userData = await collection.insertMany({ name: data.email, password: hashedPassword });
            console.log(userData);

            return res.render("login");
    }
    catch(error){
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
    
})

//login user

app.post("/login", async (req,res) => {
    try{
        const check = await collection.findOne({name: req.body.email});
        if(!check){
            res.send("No user found");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch){
           return res.render("main");
        }
        else{
           return req.send("Wrong password");
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Wrong details.");
    }
});


app.get("/keysprint_home",(req,res) =>{
    res.render('keysprint_home');
})

app.get("/quiz", (req,res) =>{
    res.render("quiz");
})

app.get("/main", (req,res)=> {
    res.render("main");
})

app.get("/output", (req,res) => {
    res.render("output");
})

app.get("/keysprint_1", (req,res) =>{
    res.render("keysprint_1");
})

app.get("/quiz-home", (req,res) =>{
    res.render("quiz-home");
})

app.get("/output-home", (req,res) =>{
    res.render("output-home");
})

const port = 3002;
app.listen(port, () =>{
    console.log(`Server running on port: ${port}`);
})