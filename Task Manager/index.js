const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));



// Route to render files list
app.get("/", function (req, res) {
  const dirPath = path.join(__dirname, "files");
  fs.readdir(dirPath, function (err, files) {
    if (err) {
      console.error("Error reading directory:", err.message);
      return res.status(500).send("Error reading files directory.");
    }
    res.render("index", { files: files });
  });
});

// Route to read a specific file
app.get("/files/:filename", function (req, res) {
  const filePath = path.join(__dirname, "files", req.params.filename);
  fs.readFile(filePath, "utf-8", function (err, filedata) {
    if (err) {
      console.error("Error reading file:", err.message);
      return res.status(404).send("File not found.");
    }
    res.render("show", { filename: req.params.filename, filedata: filedata });
  });
});

// Route to handle form submissions
app.post("/create", function (req, res) {
  const sanitizedTitle = req.body.title.replace(/[^a-zA-Z0-9_-]/g, "_"); // Sanitize filename
  const filePath = `./files/${sanitizedTitle}.txt`;

  fs.writeFile(filePath, req.body.details, function (err) {
    if (err) {
      console.error("Error writing file:", err.message);
      return res.status(500).send("Error creating file.");
    }
    res.redirect("/");
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
