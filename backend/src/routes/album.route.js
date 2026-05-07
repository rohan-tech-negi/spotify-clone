import { Router } from "express";
import { getAllAlbums } from "../controllers/albumController";


const router = Router();

router.get("/", getAllAlbums)
router.get("/:albumId", getAlbumById)
export default router;