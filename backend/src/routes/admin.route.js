import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
// import { createSong } from "../controllers/createSong.js";
import { createSong , deleteSong, createAlbum, deleteAlbum, checkAdmin} from "../controllers/adminController.js";


const router = Router();

router.use(protectRoute, requireAdmin)

router.get("/check", checkAdmin)

router.post("/songs", createSong)
router.delete("/songs/:id", deleteSong)

router.post("/albums", createAlbum)
router.delete("/albums/:id", deleteAlbum);

export default router;

