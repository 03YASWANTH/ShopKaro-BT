const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../Models/UserModel");

const Secret = process.env.JWT_SECRET;

const generateToken = (user) => {
  return jwt.sign({ userId: user._id, role: user.role }, Secret, { expiresIn: "1d" });
};


const signup = async (req, res) => {
  const { Email, username, password, role } = req.body;

  if (!Email || !username || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const existingUser = await UserModel.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      Email,
      username,
      password: hashedPassword,
      role: role || "user",
    });

    await newUser.save();

    const token = generateToken(newUser);

    res.json({
      success: true,
      message: "Registered Successfully",
      token,
      role: newUser.role,
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const signin = async (req, res) => {
  const { Email, password } = req.body;

  if (!Email || !password) {
    return res.status(400).json({ success: false, message: "Email and Password are required" });
  }

  try {
    const user = await UserModel.findOne({ Email });
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      message: "Signed in Successfully",
      token,
      role: user.role,
    });
  } catch (err) {
    console.error("Signin Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { signup, signin };
