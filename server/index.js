require("dotenv").config();
const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const app = express();
const port = 3000;
const SECRET_KEY = process.env.JWT_SECRET

app.use(express.json());

app.post("/signup", async(req, res) => {
   const username = req.body.username;
   const password = req.body.password;

   const signinSchema = zod.object({
       username: zod.string().min(1, "username is required"),
       password: zod.string()
         .min(8, "password must contain atleast 8 characters")
         .regex(/[A-Z]/, "password must contain atleast one character")
         .regex(/[0-9]/, "password must contain atleast one number")
         .regex(/[\W_]/, "password must contain atleast one special character")
   });

   const result = signinSchema.safeParse({
       username, password
   });

   if(!result.success){
      return res.status(400).json({error: result.error.format()});
   } 
   
   const saltRounds = 10;
   const hashedpassword = await bcrypt.hash(password, saltRounds);
   
   if(username){
    // if username exists in database tell them to login.
    // go to login route
   }

    // add to the database
    // generate jwt token 
    // redirect
    const token = jwt.sign({username}, SECRET_KEY);
    return res.json({
        msg: `token generated ${token}`
    })
});

app.post("/login", (req, res) => {

    // check if user has entered valid data
   const username = req.body.username;
   const password = req.body.password;

   const loginSchema = zod.object({
      username: zod.string().min(1, "username is required"),
      password: zod.string()
         .min(8, "password must contain atleast 8 characters")
         .regex(/[A-Z]/, "password must contain at least one capital letter")
         .regex(/[0-9]/, "password must contain atleast one number")
         .regex(/[\W_]/, "password must contain atleast one special character")
   });

   const result = loginSchema.safeParse({username, password});
   if(!result.success){
     return  res.status(400).json({error: result.error.format()})
   }

   // check if user is in our database if yes send them to welcome page else tell them to signin
   if(user){
    // welcome
    const token = jwt.sign({username}, SECRET_KEY); // generated a token
    return res.json({
        msg: `Token generated ${token}`
    })
   } 

   return res.json({msg: "please go to signin route"})
});

app.delete("/logout", (req, res) => {

});

app.get("/researchpaper")

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});     