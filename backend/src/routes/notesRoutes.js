import express from "express";
import requireAuth from "../middleware/requireAuth.js";
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
  getNote,
} from "../controllers/notesController.js";
import {
  writeRateLimiter,
  readRateLimiter,
} from "../middleware/rateLimiter.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", readRateLimiter, getAllNotes);
router.get("/:id", readRateLimiter, getNote);
router.post("/", writeRateLimiter, createNote);
router.put("/:id", writeRateLimiter, updateNote);
router.delete("/:id", writeRateLimiter, deleteNote);

export default router;
