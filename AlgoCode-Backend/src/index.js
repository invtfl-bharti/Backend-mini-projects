import express from "express";
import bodyParser from "body-parser";
import apiRouter from "./routes/index.js";
// import v1Router from "./routes/v1/index.js";
const app = express();
import SERVER_CONFIG from './config/server.config.js';

import { errorHandler } from './utils/errorHandler.js';



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

app.listen(SERVER_CONFIG.PORT, async () => {
  console.log(`Server is running on port ${SERVER_CONFIG.PORT}`);
  // await dbConnect();
});