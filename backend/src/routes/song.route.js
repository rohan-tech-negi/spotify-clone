import { Router } from "express";
import { getAllSongs } from "../controllers/songController.js";


const router = Router();

router.get("/", getAllSongs)

export default router;