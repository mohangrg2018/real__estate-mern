import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import { connectDB } from "./config/db.js";
import errorHandler from "./utils/error.js";

//app cofiguration
const app = express();
dotenv.config();

//database connection
connectDB();

//middlewares
app.use(express.json());

//routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

// Use the global error handler
app.use(errorHandler);

//server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
