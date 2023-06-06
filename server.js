import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// routes
import authRouter from "./routes/authRoutes.js";
import projectRouter from "./routes/projectRoutes.js";

// middleware
import authenticateUser from "./middleware/auth.js";

const app = express();

app.use(cors());
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome Dear!");
});
app.use("/auth", authRouter);
app.use("/project", authenticateUser, projectRouter);

const port = process.env.PORT || 8080;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, async () => {
      console.log(`Server is listening on port:=> http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
