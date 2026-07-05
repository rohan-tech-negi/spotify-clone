import { Router } from "express";
import { createAlbum, createSong, deleteAlbum, deleteSong } from "../controller/admin.controller.js";
import { protectRoute, requireArtist } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute, requireArtist);

router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);

router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);

export default router;
