import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import cors from "cors";

//app configuration
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(cors());

//db config
connectDB();

//routes
app.use("/api/auth", authRouter);

//listen to requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
