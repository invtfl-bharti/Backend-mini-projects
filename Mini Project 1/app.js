const express = require('express');
const app = express();
const path = require('path');




app.get("/", function (req, res) {
    res.send("Hey");
})

app.listen(3000);