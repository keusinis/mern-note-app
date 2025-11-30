import express from "express";
import { loginUser, signupUser } from "../controllers/userController.js";
import { loginRateLimiter, signupRateLimiter } from "../middleware/rateLimiter.js";
const router = express.Router();

router.post("/login", loginRateLimiter, loginUser);
router.post("/signup", signupRateLimiter, signupUser);

export default router;
