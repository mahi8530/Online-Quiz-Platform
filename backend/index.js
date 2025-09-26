import express from "express";
import crypto from "crypto";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Result from "./models/result.js";
import User from "./models/user.js";
dotenv.config(); // Load environment variables
console.log("Loaded Gmail:", process.env.EMAIL_USER);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const app = express();
const PORT = 5000;

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../frontend")));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/quizApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(" MongoDB Connected"))
.catch(err => console.error(" MongoDB Error:", err));

// Register Route
app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered. Please log in." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email: normalizedEmail, password: hashedPassword });

    await user.save();
    res.json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// Login Route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful!" });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error during login" });
  }
});

// Quiz Questions Route
import Question from "./models/question.js";

app.get("/api/questions", async (req, res) => {
  try {
    const allQuestions = await Question.find(); // get all 42
    const shuffled = allQuestions.sort(() => 0.5 - Math.random()); // shuffle
    const selected = shuffled.slice(0, 20); // pick first 20
    res.json(selected);
  } catch (err) {
    console.error("Error fetching questions:", err); // full error
    res.status(500).json({ message: "Failed to load questions" });
  }
});
//forgot route

app.post("/api/forgot-password", async (req, res) => {
  const { email } = req.body;
  console.log(" Forgot password request received for:", email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(" No user found with email:", email);
      return res.status(404).json({ message: "No account found with this email." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000;
    await user.save();
    console.log(" Token generated and saved for:", email);

    const resetLink = `http://localhost:5000/reset-password/${token}`;
    console.log("Reset link:", resetLink);

    // Wrap sendMail in its own try-catch
    try {
      await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: email,
  subject: " Reset Link ",
  text: `Click here to reset your password: ${resetLink}`,
});
      console.log(" Email sent successfully to:", email);
      res.json({ message: "Password reset link sent to your email." });
    } catch (emailErr) {
      console.error(" Email sending failed:", emailErr); 
      res.status(500).json({ message: "Failed to send email." });
    }

  } catch (err) {
    console.error("Forgot password route error:", err); 
    res.status(500).json({ message: "Server error during password reset." });
  }
});

// reset route

//  Middleware and static setup (near the top)
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../frontend")));

//  Serve reset.html when user clicks the link
app.get("/reset-password/:token", (req, res) => {
  console.log(" GET /reset-password/:token hit with token:", req.params.token);
  res.sendFile(path.join(__dirname, "../frontend/reset.html"));
});

//  Handle password update when user submits new password
app.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      console.log("❌ Invalid or expired token:", token);
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    console.log("✅ Password reset successful for:", user.email);
    res.json({ message: "Password has been reset successfully!" });
  } catch (err) {
    console.error("❌ Error during password reset:", err);
    res.status(500).json({ message: "Server error during password reset." });
  }
});


//Result rout


app.post("/api/result", async (req, res) => {
  try {
    const { email, score, total } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      console.log("Blocked unregistered email:", normalizedEmail);
      return res.status(400).json({ message: "Email not registered. Please sign up first." });
    }

    const result = new Result({ email: normalizedEmail, score, total });
    await result.save();

    res.json({ message: "Result saved successfully!" });
  } catch (err) {
    console.error("Error saving result:", err);
    res.status(500).json({ message: "Failed to save result" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});


