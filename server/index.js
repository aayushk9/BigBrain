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

app.use(express.json());

mongoose.connect(URI)
    .then(() => console.log(`Database connected`))
    .catch((err) => console.error(err))

const users = mongoose.model("users", ({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}))

app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const signinSchema = zod.object({
        username: zod.string().min(1, "username is required"),
        password: zod.string()
            .min(8, "password must contain atleast 8 characters")
            .regex(/[A-Z]/, "password must contain atleast one capital letter")
            .regex(/[0-9]/, "password must contain atleast one number")
            .regex(/[\W_]/, "password must contain atleast one special character")
    });

    const result = signinSchema.safeParse({
        username, password
    });

    if (!result.success) {
        return res.status(400).json({ error: result.error.format() });
    }

    const saltRounds = 10;
    const hashedpassword = await bcrypt.hash(password, saltRounds);
    const userExists = await users.findOne({ username, password });
    const usernameExists = await users.findOne({ username });

    if (usernameExists) {
        return res.json({
            msg: "Username already taken"
        })
    }

    if (userExists) {
        return res.json({
            msg: "Please go to login route"
        })
    }

    const token = jwt.sign({ username }, SECRET_KEY);
    const user = new users({
        username: username,
        password: hashedpassword
    })
    await user.save();
    return res.json({
        msg: "user added to database",
        token: `${token}`
    })
    // redirect
});

app.post("/login", async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const loginSchema = zod.object({
        username: zod.string().min(1, "username should have atleast one character"),
        password: zod.string()
            .min(8, "password must contain atleast 8 characters")
            .regex(/[A-Z]/, "password must contain atleast one capital letter")
            .regex(/[0-9]/, "password must contain atleast one number")
            .regex(/[\W_]/, "password must contain at least one special character")
    })

    const result = loginSchema.safeParse({
        username: username,
        password: password
    })

    if (!result.success) {
        return res.json({
            msg: "Please enter valid data"
        })
    }

    const userExists = await users.findOne({ username });

    if (!userExists) {
        return res.json({
            msg: "User does not exist, please go to signin route"
        })
    }

    const token = jwt.sign({ username }, SECRET_KEY);
    return res.json({
        msg: `Token generated ${token}`
    })
});

app.delete("/logout", (req, res) => {

});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});       