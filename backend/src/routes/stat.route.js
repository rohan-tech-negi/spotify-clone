import { Router } from "express";
import { protectRoute, requireArtist } from "../middleware/auth.middleware.js";
import { getStats } from "../controller/stat.controller.js";

const router = Router();

router.get("/", protectRoute, requireArtist, getStats);

export default router;
