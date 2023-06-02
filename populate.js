import { readFile } from "fs/promises";

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import User from "./models/User.js";

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const jsonUsers = JSON.parse(
      await readFile(new URL("./email-data.json", import.meta.url))
    );
    await User.create(jsonUsers);
    console.log("Success!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
