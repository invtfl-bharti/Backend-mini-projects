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

app.get("/login", (req, res) => {
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
        const token = jwt.sign({ email: email, userid: user._id }, "shhhh");
        res.cookie("token", token);
        res.redirect("/profile"); // Use absolute path
      } else {
        res.redirect("/login"); // Use absolute path
      }
    });
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/profile", isLoggedIn, async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email }); // Use email from the token
    if (!user) {
      return res.status(404).send("User not found");
    }
    console.log(user); // Logs user data to the terminal
    res.render("profile", { user }); // Pass user data to the profile view
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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      username,
      email,
      name,
      age,
      password: hashedPassword,
    });

    const token = jwt.sign({ email, userid: newUser._id }, "shhhh");
    res.cookie("token", token);
    return res.send("Registered successfully");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/logout", (req, res) => {
  res.cookie("token", "", { maxAge: 0 }); // Clear the token
  res.redirect("/login"); // Redirect to login page
});

// Middleware to check login status
function isLoggedIn(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login"); // Redirect if token is missing
  }

  try {
    const data = jwt.verify(token, "shhhh"); // Verify the token
    req.user = data; // Attach user data to request
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("Invalid token:", error.message);
    return res.redirect("/login"); // Redirect if token is invalid
  }
}

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
