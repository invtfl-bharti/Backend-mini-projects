import { StatusCodes } from "http-status-codes";
import NotImplementedError from "../errors/notimplemented.error.js";
// import { healthCheck } from "../utils/healthCheck.js";

// export const pingProblemController = healthCheck("Problem Service Controller");

export const addProblem = async (req, res, next) => {
  try {
    throw new NotImplementedError("Add Problem");
    // console.log("Incoming request body:", req.body);
    // const newProblem = await problemService.createProblem(req.body);

    // return res.status(StatusCodes.CREATED).json({
    //   success: true,
    //   message: "Problem created successfully",
    //   error: {},
    //   data: newProblem,
    // });
  } catch (error) {
    next(error);
  }
};

export const getAllProblems = async (req, res, next) => {
  try {
    const allProblems = await problemService.getAllProblems();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Problems fetched successfully",
      error: {},
      data: allProblems,
    });
  } catch (error) {
    next(error);
  }
};

export const getProblemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const problem = await problemService.getProblemById(id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Problem fetched successfully",
      error: {},
      data: problem,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProblemById = (req, res, next) => {
  try {
    throw new NotImplementedError("updateProblemById", {
      reason: "Functionality is pending...",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProblemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await problemService.deleteProblemById(id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Problem deleted successfully",
      error: {},
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
