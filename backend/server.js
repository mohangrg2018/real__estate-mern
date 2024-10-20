import express from "express";
import dotenv from "dotenv";

//app configuration
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

//api configuration
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
