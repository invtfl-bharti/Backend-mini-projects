function pingController(req, res) {
  return res.json({ message: "Ping controller is up." });
}

function addProblem(req, res) {
  return res.status(501).json({
    message: "Not implemented",
  });
}

function getProblem(req, res) {
  return res.status(501).json({
    message: "Not implemented",
  });
}

function deleteProblem(req, res) {
  return res.status(501).json({
    message: "Not implemented",
  });
}

function updateProblem(req, res) {
  return res.status(501).json({
    message: "Not implemented",
  }); 
}
module.exports = {
  addProblem,
  getProblem,
  deleteProblem,
  updateProblem,
  pingController,
};
