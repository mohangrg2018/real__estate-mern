import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";

// Signup Controller
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check if all fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    // Check for existing username or email
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ msg: "Username or email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    // Check for duplicate key error (E11000) from MongoDB
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0]; // Get the field that caused the duplicate error (username or email)
      return res
        .status(409)
        .json({
          msg: `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } already exists`,
        });
    }

    // Pass other errors to the error handler
    next(error);
  }
};
