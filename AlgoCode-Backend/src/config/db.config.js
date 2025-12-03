import mongoose from "mongoose";
import { ATLAS_DB_URL } from "./server.config.js";

export async function connectToDB() {
  try {
    // You probably want to connect in all envs, not just dev
    // If you really want to restrict, fix spelling: "development"
    // if (NODE_ENV === "development") { ... }

    await mongoose.connect(ATLAS_DB_URL);
    console.log("Successfully connected to db");
  } catch (err) {
    console.log("Unable to connect the DB server");
    console.error(err);
    throw err; // important so the app knows DB failed
  }
}