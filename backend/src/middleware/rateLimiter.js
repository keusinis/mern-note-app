import {
  rateLimit,
  loginRateLimit,
  signupRateLimit,
  writeRateLimit,
  readRateLimit,
} from "../config/upstash.js";

export const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit("limit-key");

    if (!success)
      return res
        .status(429)
        .json({ message: "Too many request, please try again later" });

    next();
  } catch (error) {
    console.error("Error in rateLimiter", error);
    next(error);
  }
};

// Limiters use req.user._id where possible, req.ip as fallback

export const loginRateLimiter = async (req, res, next) => {
  try {
    const identifier = `login:ip:${req.ip}`;

    const result = await loginRateLimit.limit(identifier);
    req.rateLimit = {
      identifier,
      success: result.success,
      remaining: result.remaining,
      limit: result.limit,
      reset: result.reset,
    };
    console.log(result);

    if (!result.success)
      return res.status(429).json({
        error: "Too many login attempts, please try again later",
        retryAfter: Math.ceil((result.reset - Date.now()) / 1000) + " seconds",
      });

    next();
  } catch (error) {
    console.error("Error in rateLimiter", error);
    next();
  }
};

export const signupRateLimiter = async (req, res, next) => {
  try {
    const identifier = `signup:ip:${req.ip}`;

    const result = await signupRateLimit.limit(identifier);

    if (!result.success)
      return res.status(429).json({
        message: "Too many attempts, please try again later",
        retryAfter: Math.ceil((result.reset - Date.now()) / 1000) + " seconds",
      });

    next();
  } catch (error) {
    console.error("Error in rateLimiter", error);
    next();
  }
};

export const writeRateLimiter = async (req, res, next) => {
  try {
    const identifier = req.user
      ? `write:user:${req.user._id}`
      : `write:ip:${req.ip}`;

    const result = await writeRateLimit.limit(identifier);

    if (!result.success)
      return res.status(429).json({
        message: "Too many write attempts, please try again later",
        retryAfter: Math.ceil((result.reset - Date.now()) / 1000) + " seconds",
      });

    next();
  } catch (error) {
    console.error("Error in rateLimiter", error);
    next();
  }
};

export const readRateLimiter = async (req, res, next) => {
  try {
    const identifier = req.user
      ? `read:user:${req.user._id}`
      : `read:ip:${req.ip}`;

    const result = await readRateLimit.limit(identifier);

    if (!result.success)
      return res.status(429).json({
        message: "Too many read attempts, please try again later",
        retryAfter: Math.ceil((result.reset - Date.now()) / 1000) + " seconds",
      });

    next();
  } catch (error) {
    console.error("Error in rateLimiter", error);
    next();
  }
};
