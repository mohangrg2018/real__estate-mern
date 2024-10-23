import User from "../models/user.models.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  // Check if username or email already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(400).json({ error: "Username or email already exists" });
  }
  try {
    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};
