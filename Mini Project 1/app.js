const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');
const cookieParser = require('cookie-parser');


// middlewares
app.set("viee engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", function (req, res) {
    res.render("index");
});

app.listen(3000);