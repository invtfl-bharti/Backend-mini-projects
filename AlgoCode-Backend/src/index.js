const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/server.config");
const app = express();
const apiRouter = require("./routes");
const BaseError = require("./errors/base.error");
const NotFoundError = require("./errors/NotFoundError");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use("/api", apiRouter);

app.get("/ping", (req, res) => {
  return res.json({ message: "Problem Service is alive" });
});
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
  try {
    throw new NotFoundError({});
  } catch (error) {
    console.log("Something went wrong", error.name, error.stack);
  } finally {
    console.log("executed finally");
  }
});
