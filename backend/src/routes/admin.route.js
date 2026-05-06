import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
// import { createSong } from "../controllers/createSong.js";
import { createSong } from "../controllers/adminController.js";


const router = Router();

router.post("/songs", protectRoute, requireAdmin, createSong)

export default router;

