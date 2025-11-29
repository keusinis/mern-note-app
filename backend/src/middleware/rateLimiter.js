import rateLimit from "../config/upstash.js";

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
