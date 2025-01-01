const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");
const postModel = require("./models/posts");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Middleware setup
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (!res.headersSent) {
    res.status(500).send("Internal Server Error");
  }
});

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", isLoggedIn, (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).send("Error during password comparison");
      }

      if (result) {
        const token = jwt.sign({ email, userid: user._id }, "shhhh");
        res.cookie("token", token);
        return res.status(200).send("You can login");
      } else {
        return res.redirect("/login");
      }
    });
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/profile", isLoggedIn, async  (req, res) => {
  try {
    const user = await userModel.findById(req.user.userid);
    if (!user) {
      return res.status(404).send("User not found");
    }
      res.render("profile", { user });
      // Pass user details to the EJS template
      console.log(req.user);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});


app.post("/register", async (req, res) => {
  const { email, username, age, name, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already registered");
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return res.status(500).send("Error generating salt");
      }

      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res.status(500).send("Error hashing password");
        }

        const newUser = await userModel.create({
          username,
          email,
          name,
          age,
          password: hash,
        });

        const token = jwt.sign({ email, userid: newUser._id }, "shhhh");
        res.cookie("token", token);
        return res.send("Registered successfully");
      });
    });
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.render("login");
});

// Middleware to check login status
function isLoggedIn(req, res, next) {
  try {
    if (!req.cookies.token) {
      return res.status(401).send("You must be logged in");
    }

    const data = jwt.verify(req.cookies.token, "shhhh");
    req.user = data;
    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
}

// Start the server
app.listen(3000);
