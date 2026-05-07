import { Router } from "express";
import { getAllSongs , getFeaturedSongs} from "../controllers/songController.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";


const router = Router();

router.get("/", protectRoute, requireAdmin, getAllSongs)
router.get("/featured", getFeaturedSongs);

export default router;