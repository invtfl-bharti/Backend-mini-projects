import express from "express";
import bodyParser from "body-parser";
import apiRouter from "./routes/index.js";
import mongoose from "mongoose";
import {PORT} from "./config/server.config.js";
import { connectToDB } from "./config/db.config.js";
const app = express();


import { errorHandler } from "./utils/errorHandler.js";


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use("/api", apiRouter);
// app.use("/api/v1", v1Router);

app.get("/ping", (req, res) => {
  return res.json({ message: "Problem Service is alive" });
});

app.use(errorHandler);
//last middleware if any error comes

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  // await dbConnect();
  await connectToDB();
  console.log("Successfully connected to db");

});
