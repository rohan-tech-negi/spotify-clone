import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { createSong } from "../controllers/createSong.js";


const router = Router();

router.post("/create-song", protectRoute, requireAdmin, createSong)

export default router;

