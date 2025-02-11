require("dotenv").config();
const express = require("express");
const zod = require("zod");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const app = express();
const port = 3000;
const SECRET_KEY = process.env.JWT_SECRET
const URI = process.env.MONGO_URI
const User = require("./models/userModel");
const ResearchPaper = require("./models/ResearchPaper");
const scraper = require("./scraper/scraper")

app.use(express.json());

mongoose.connect(URI)
    .then(() => console.log(`Database connected`))
    .catch((err) => console.error(err))

app.post("/signup", async (req, res) => {

    const { username, password } = req.body;

    // zod schema for validating user input
    const signinSchema = zod.object({
        username: zod.string().min(1, "username is required"),
        password: zod.string()
            .min(8, "password must contain atleast 8 characters")
            .regex(/[A-Z]/, "password must contain atleast one capital letter")
            .regex(/[0-9]/, "password must contain atleast one number")
            .regex(/[\W_]/, "password must contain atleast one special character")
    });

    // using that schema check if data is valid
    const result = signinSchema.safeParse({
        username, password
    });

    if (!result.success) {
        return res.status(400).json({ error: result.error.format() });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
        const comparePassword = await bcrypt.compare(password, usernameExists.password)
        if (usernameExists && comparePassword) {
            return res.json({
                msg: "Please go to login route to login"
            })
        } else {
            return res.json({
                msg: "Username already taken"
            })
        }
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const token = jwt.sign({ username }, SECRET_KEY);

    const user = new User({
        username: username,
        password: hashedPassword
    })

    await user.save();
    return res.json({
        msg: "user added to database",
        token: `${token}`
    })
    // redirect
});

app.post("/login", async (req, res) => {

    const { username, password } = req.body;

    const loginSchema = zod.object({
        username: zod.string().min(1, "username should have atleast one character"),
        password: zod.string()
            .min(8, "password must contain atleast 8 characters")
            .regex(/[A-Z]/, "password must contain atleast one capital letter")
            .regex(/[0-9]/, "password must contain atleast one number")
            .regex(/[\W_]/, "password must contain at least one special character")
    })

    // making sure enter valid data
    const result = loginSchema.safeParse({
        username: username,
        password: password
    })

    if (!result.success) {
        return res.status(400).json({
            msg: "Please enter valid data"
        })
    }

    // check for correct password
    const usernameExists = await User.findOne({ username });
    if (!usernameExists) {
        return res.status(404).json({
            msg: "User does not exist, please go to signin route"
        })
    }

    const comparePassword = await bcrypt.compare(password, usernameExists.password)
    if (!comparePassword) {
        return res.status(401).json({
            msg: "Please enter correct password"
        })
    }

    const token = jwt.sign({ username }, SECRET_KEY);
    return res.status(200).json({
        msg: `Token generated ${token}`
    })
});

app.delete("/logout", (req, res) => {

});

app.post("/research", (req, res) => {
    const searchForPaper = req.body.searchForPaper;
    /******
     * 
     *let that user see this content for multiple times but after that tell them to signup
      so than use jwt verify to verify the token and authenticate

     we need to compare the data in our database with the data the user has requested
     using text index we will be searching for the keywords entered by the user and compare it with the keywords
     in our database so the papers which match will be shared
     the paper which matches the most should be at the top
     * 
     * If no match in DB, then:

            Scrape research papers from the web (e.g., Google Scholar, arXiv, PubMed).
            Extract important keywords from the scraped papers.
            Store those keywords & links in the database for future searches.
            Return the scraped paper to the user.
    
     * 
     * 
     * **********/ 
    
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});       
