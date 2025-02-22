require("dotenv").config();
const express = require("express");
const zod = require("zod");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const app = express();
const port = 3000;
const SECRET_KEY = process.env.JWT_SECRET
const URI = process.env.MONGO_URI

const User = require("./models/userModel");
const ResearchPaper = require("./models/ResearchPaper");  

const scraper = require("./scraper/scraper")
const news = require("./news/news"); 
const ycBlog = require("./startups/yc");
const startups = require("./startups/allStartups");
const earlyStageStartups = require("./startups/earlyStageStartups");
const saas = require("./startups/saastr");
const aiStartup = require("./startups/aiStartups");
const founders = require("./startups/founders")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }))   

mongoose.connect(URI)
    .then(() => console.log(`Database connected`))   
    .catch((err) => console.error(err))     

app.post("/signup", async (req, res) => {

    const { username, password } = req.body;
    console.log(req.body);

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
        return res.json({ msg: "please enter valid data" });
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
    return res.status(201).json({
        msg: "user added to database",
        token: `${token}`   
    })   
    // redirect
});

app.post("/login", async (req, res) => {

    const { username, password } = req.body;
    console.log(req.body);  

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
        return res.json({
            msg: "Please enter valid data"
        })
    }

    // check for correct password
    const usernameExists = await User.findOne({ username });
    if (!usernameExists) {
        return res.json({
            msg: "User does not exist, please go to signin route"
        })
    }

    const comparePassword = await bcrypt.compare(password, usernameExists.password)
    if (!comparePassword) {
        return res.json({ 
            msg: "Please enter correct password"
        })
    }

    const token = jwt.sign({ username }, SECRET_KEY);   
    return res.status(200).json({
        token: `${token}`
    })
});     

app.delete("/logout", (req, res) => {

});

app.post("/research-papers", async(req, res) => {
    const {userInput} = req.body;
    console.log(req.body)

    if(!userInput){
        return res.json({
            msg: "Input field is required"     
        })
    }
  
    try {
        const dbResults = await ResearchPaper.find(  
            // text index to search using $text
            { $text: { $search: userInput } },  // $search: MongoDB searches for userInput in all fields (e.g., title, abstract, keywords).
            { score: { $meta: "textScore" } } 
        )
         .sort({ score: { $meta: "textScore" } })
         //.limit(2);
    
    
        const useScraper = await scraper(userInput); 

        const finalResult = [  
            ...dbResults.map(paper => ({  
                title: paper.title,
                author: paper.author,
                link: paper.link,
                topic: paper.topic,
                source: paper.source,    
            })),
            ...useScraper.map(item => ({  
                 ...item,
            }))
        ]

            return res.json({  
                papers: finalResult  
            })
    }  catch(err){  
        console.error(err);
        return res.status(500).json({ msg: "Internal server error" });
    }
})

app.get('/cryptonews', async(req, res) => {
  const getNews = await news(); 
  return res.json({  
    news: getNews
  })
})   

app.get("/ycblogs", async (req, res) => {
   const getYcblogs = await ycBlog();
   return res.json({
     startups: getYcblogs    
   })
});

app.get("/earlyStageStartups", async(req, res) => {
    const getEarlyStartup = await earlyStageStartups();
    return res.json({
        startups: getEarlyStartup
    })
})

app.get("/all-about-startups", async(req, res) => {
    const getStartups = await startups();
    return res.json({
      startups: getStartups
    })
  })

app.get("/KnowSaaS", async (req, res) => {
    
    const getSaaS = await saas();
    return res.json({
        Note: "SaaStr is the only non-vendor destination where SaaS companies can come together to learn and grow their businesses through content, events and training.",
        startups: getSaaS
    })
} )

   
app.get("/aistartups", async(req, res)=> {
    const getAIStartups = await aiStartup();
    return res.json({
        startups: getAIStartups
    })
})

app.get("/entrepreneur", async(req, res) => {
    const getFounders = await founders();
    return res.json({
        startups: getFounders
    })
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});            