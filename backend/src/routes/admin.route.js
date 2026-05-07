import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
// import { createSong } from "../controllers/createSong.js";
import { createSong } from "../controllers/adminController.js";


const router = Router();

router.post("/songs", protectRoute, requireAdmin, createSong)
router.delete("/songs/:id", protectRoute, requireAdmin, deleteSong)

export default router;

