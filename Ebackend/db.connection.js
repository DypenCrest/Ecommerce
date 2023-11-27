import dotenv from 'dotenv'; // Import dotenv as an ES module

dotenv.config(); // Load environment variables from .env file

import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connection: OK");
  } catch (error) {
    console.log("DB Connection:Failed");
    console.log(error.message);
  }
};
