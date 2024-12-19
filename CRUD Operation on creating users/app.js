const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const userModel = require("./models/user");

// middleeware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.render("index");
});

app.get('/read', async function (req, res) {
    let users = await userModel.find();
    res.render("read", { users});
})


app.get('/edit/:userid', async function (req, res) {
    let users = await userModel.findOne({_id : req.params.userid});
    res.render("edit", { users});
})


app.get('/update/:userid', async function (req, res) {
    let { image, email, name } = req.body;
    let user = await userModel.findOneAndUpdate({ id: req.params.userid }, { name, email, userid }, {new : true});
    res.redirect("/read");
})

app.post("/create", async function (req, res) {
  try {
    let { name, email, image } = req.body;
    console.log("Received Data:", req.body); // Debug: Log the request body

    let user = await userModel.create({
      name,
      email,
      image,
    });

    console.log("User Created:", user); // Debug: Log the created user document

    // Redirect to the /read page after user creation
    res.redirect("/read");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
});


app.listen(3000);
