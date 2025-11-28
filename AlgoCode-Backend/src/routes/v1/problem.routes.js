const express = require('express');

const {ProblemController} = require('../../controllers')
const problemRouter = express.Router();

problemRouter.get('/ping', ProblemController.pingController);

problemRouter.get('/:id', ProblemController.getProblem);

problemRouter.get('/', ProblemController.getProblem);

problemRouter.post('/', ProblemController.addProblem);

problemRouter.delete('/:id',ProblemController.deleteProblem);

problemRouter.put('/:id', ProblemController.updateProblem);


module.exports = problemRouter;

