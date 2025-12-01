import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { loginRateLimit } from "../config/upstash.js";
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "6h" });
};

// login user
export async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    if (req.rateLimit?.identifier) {
      await loginRateLimit.resetUsedTokens(req.rateLimit.identifier);
    }

    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    const remainingAttempts = req.rateLimit?.remaining ?? 0;

    res.status(400).json({
      error: error.message, 
      remainingAttempts: remainingAttempts});
  }
}

// signup user
export async function signupUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
