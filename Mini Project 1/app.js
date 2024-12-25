const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("./models/user");

// middlewares
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", function (req, res) {
  res.render("index");
});

app.post("/register", async function (req, res) {
  let { email, username, password, age, name } = req.body;
  let user = await userModel.findOne({ email });
  if (user) return res.status(500).send("User already registered");

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      // create a new user in the database with the hashed password
      let user = await userModel.create({
        username,
        email,
        age,
        name,
        password: hash,
      });

      // create a JWT token for the newly registered user
      let token = jwt.sign({ email: email, userid: user._id }, "shhhhh");

      res.cookie("token", token);
      res.send("Registered");
    });
  });
});


app.get("/profile", isLoggedIn, function (req, res) {
    console.log(req.user);
    res.render("login");     
})

app.get("/login",isLoggedIn,function (req, res) {
  res.render("login");
});

app.post("/login", async function (req, res) {
  let { email, password } = req.body;

  // check if the password matches the existing password

  let user = await userModel.findOne({ email });
  if (!user) return res.status(500).send("User doesn't exist");
  bcrypt.compare(password, user.password, function (err, result) {
    if (result) res.status(200).send("You can login now");
    else res.redirect("/login");
  });
});


app.get("/logout", function (req, res) {
    res.cookie("token", "");
    res.render("login");
})

// middleware for protected routes
function isLoggedIn(req, res, next) {
    if (req.cookies.token === "") res.send("You must be logged in");
    else {
        let data = jwt.verify(req.cookies.token, "shhhh");

        req.user = data;
    }
    next();
}
app.listen(3000);
