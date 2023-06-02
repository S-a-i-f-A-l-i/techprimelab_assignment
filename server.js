import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// routes
import authRouter from "./routes/authRoutes.js";

// middleware
import authenticateUser from "./middleware/auth.js";

const app = express();

app.use(express.json());

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Welcome Dear!");
});

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
