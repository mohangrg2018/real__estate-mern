import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

//app cofiguration
const app = express();
dotenv.config();

//database connection
connectDB();
console.log(process.env.MONGODB_URL);

//middlewares
app.use(express.json());

//routes

//server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
