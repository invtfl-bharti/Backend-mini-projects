import { Problem } from "../models";

export class ProblemService {
    
  constructor(problemRepository) {
    this.problemRepository = problemRepository;
  }

  async createProblem(problemData) {
    // try {
    //     const problem = await Problem.problemData
    // } catch (error) {
    //   console.log(error);
    // }
  }
}
