import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
// import { createSong } from "../controllers/createSong.js";
import { createSong , deleteSong} from "../controllers/adminController.js";


const router = Router();

router.post("/songs", protectRoute, requireAdmin, createSong)
router.delete("/songs/:id", protectRoute, requireAdmin, deleteSong)

router.post("/albums", protectRoute, requireAdmin, createAlbum)

export default router;

