const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require("./src/config");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { error } = require('console');



const app = express();

//convert data into json format
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());
app.use(session({
    name:"pookie",
    secret:"Relentless",
    resave: false,
    saveUninitialized:true,
    cookie: {secure: false}
}));

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
                name: req.body.name,
                password: req.body.password
            }

            //check if user already existt
            const existingUser = await collection.findOne({name: data.name});

            if(existingUser){
                return res.render("signup", {error: "User already exist, please chose another Username" });
            }
            
            const hashedPassword = await bcrypt.hash(data.password, 10);

            // Store user in DB
            // const userData = await collection.insertMany({ name: data.name, password: hashedPassword });
            const userData = await collection.create({
                name: data.name,
                password: hashedPassword,
                scores:{
                    keysprint:0,
                    quizcode:{c: 0, cpp: 0, java: 0, python: 0, javascript: 0, typescript: 0},
                    output:{c: 0, cpp: 0, java: 0, python: 0, javascript: 0, typescript: 0}
                }
            })
            console.log("User created: ", userData);

            return res.render("login");
    }
    catch(error){
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
    
})

//login user

// app.post("/login", async (req,res) => {
//     try{
//         const user = await collection.findOne({name: req.body.name});
//         if(!user){
//             return res.render("login", {error: "No user found"});
//         }

//         const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
//         if(isPasswordMatch){
//            req.session.username = user.name;
//            req.session.userId = user._id;
//            return res.render("main");
//         }
//         else{
//            return res.render("login", {error: "Incorrect password, Try again Man"});
//         }
//     }
//     catch (error) {
//         console.error(error);
//         return res.status(500).send("Wrong details.");
//     }
// });


app.post("/login", async (req, res) => {
    try {
        const user = await collection.findOne({ name: req.body.name });
        if (!user) {
            return res.render("login", { error: "No user found" });
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (isPasswordMatch) {
            req.session.username = user.name;
            req.session.userId = user._id.toString();  // 🔥 Convert _id to string
            
            req.session.save(err => {  // 🔥 Ensure session is saved before redirecting
                if (err) {
                    console.error("Session save error:", err);
                    return res.status(500).send("Session error");
                }
                console.log("User logged in. Session:", req.session);
                return res.redirect("/main");
            });
        } else {
            return res.render("login", { error: "Incorrect password, Try again Man" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Wrong details.");
    }
});

app.get("/profile", async (req, res) => {
    console.log("Session Data:", req.session); // Log the entire session

    if (!req.session.userId) {  // Change from username to userId
        console.log("Redirecting to login - No userId in session");
        return res.redirect("/login");
    }

    try {
        const user = await collection.findById(req.session.userId);
        console.log("Fetched user:", user);

        if (!user) {
            console.log("User not found - Redirecting to login");
            return res.redirect("/login");
        }

        const scores = user.scores || { keysprint: 0, quizcode: {}, output: {} };
        console.log("Scores:", scores);

        res.render("profile", { user, scores });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).send("Error fetching profile");
    }
});

app.get("/logout", (req,res) => {
    req.session.destroy((err) => {
        if(err){
            return res.status(500).alert("Error logging out");
        }
        res.redirect("/login");
    });
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

app.post("/update-keysprint-score", async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).send("User not logged in");
        }

        let { score } = req.body; 

        if(!score || isNaN(score)){
            return res.status(400).send("Invalid score value");
        }

        score = Number(score);

        const user = await collection.findById(req.session.userId);
        if(!user){
            return res.status(400).send("User not found");
        }

        const updatedUser = await collection.findByIdAndUpdate(
            req.session.userId,
            {$set: {"scores.keysprint": score} },
            {new: true}
        )
        
        // await collection.findByIdAndUpdate(req.session.userId, {
        //     $set: { "scores.keysprint": score }
        // });

        res.json({ message: "Keysprint score updated successfully!", updatedScore: updatedUser.scores.keysprint });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating score");
    }
});

// Update Quiz Game Score (Different Languages)
// app.post("/update-quiz-score", async (req, res) => {
//     try {
//         if (!req.session.userId) {
//             console.log("User not logged in");
//             return res.status(401).send("User not logged in");
//         }

//         const { language, score } = req.body;
//         console.log(`Updating score for ${language} with score: ${score}`);

//         if (!["c", "cpp", "java", "python", "javascript", "typescript"].includes(language)) {
//             console.log("Invalid language");
//             return res.status(400).send("Invalid language");
//         }

//         // Find the user
//         const user = await collection.findById(req.session.userId);
//         if (!user) {
//             console.log("User not found");
//             return res.status(404).send("User not found");
//         }

//         console.log("Current Scores:", user.scores.quizcode);

//         // Get current highest score
//         const currentScore = user.scores.quizcode[language] || 0;

//         if (score > currentScore) {
//             console.log(`Updating ${language} score to ${score}`);

//             await collection.findByIdAndUpdate(req.session.userId, {
//                 $set: { [`scores.quizcode.${language}`]: score }
//             });

//             console.log("Updated Scores:", await collection.findById(req.session.userId));

//             return res.json({ message: `New high score for ${language}: ${score}!` });
//         }

//         console.log(`Score not updated (lower than previous best: ${currentScore})`);
//         res.json({ message: `Score not updated (lower than previous best: ${currentScore})` });
//     } catch (error) {
//         console.error("Error updating score:", error);
//         res.status(500).send("Error updating quiz score");
//     }
// });

app.post("/update-quiz-score", async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).send("User not logged in");
        }

        let { language, score } = req.body;
        language = language.toLowerCase();  // 🔥 Convert to lowercase

        if (!["c", "cpp", "java", "python", "javascript", "typescript"].includes(language)) {
            return res.status(400).send("Invalid language");
        }

        // Find the user
        const user = await collection.findById(req.session.userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Get current highest score
        const currentScore = user.scores.quizcode[language] || 0;

        if (score > currentScore) {
            // Update only if new score is higher
            await collection.findByIdAndUpdate(req.session.userId, {
                $set: { [`scores.quizcode.${language}`]: score }
            });
            return res.json({ message: `New high score for ${language}: ${score}!` });
        }

        res.json({ message: `Score not updated (lower than previous best: ${currentScore})` });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating quiz score");
    }
});


// Update 'Guess the Output' Game Score
app.post("/update-output-score", async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).send("User not logged in");
        }

        const { language, score } = req.body; // Expecting { language: "python", score: 7 }

        if (!["c", "cpp", "java", "python", "javascript", "typescript"].includes(language)) {
            return res.status(400).send("Invalid language");
        }

        await collection.findByIdAndUpdate(req.session.userId, {
            $set: { [`scores.output.${language}`]: score }
        });

        res.json({ message: `Output game score for ${language} updated!` });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating output game score");
    }
});


const port = 3002;
app.listen(port, () =>{
    console.log(`Server running on port: ${port}`);
})