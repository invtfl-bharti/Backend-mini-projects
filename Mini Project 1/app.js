const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');


// middlewares
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", function (req, res) {
    res.render("index");
});

app.post("/register", async function (req, res) {
    let { email, username, age, name } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
        return res.status(500).send("User already registered");
    }
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            let user = await userModel.create({
                username,
                email,
                name,
                age,
                password:hash
            })
        }) 
    })

})

app.listen(3000);