import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const ATLAS_DB_URL = process.env.ATLAS_DB_URL;
export const NODE_ENV = process.env.NODE_ENV || "development";
