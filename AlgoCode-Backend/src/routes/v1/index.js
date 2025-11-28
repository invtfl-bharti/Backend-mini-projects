const express = require('express');

const problemRouter = require('./problem.routes')
const v1Router = express.Router();

v1Router.use('/problems', problemRouter);

module.exports = v1Router;