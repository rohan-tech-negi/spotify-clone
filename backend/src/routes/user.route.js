import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { becomeArtist, getAllUsers, getCurrentUser, getMessages } from "../controller/user.controller.js";
const router = Router();

router.get("/me", protectRoute, getCurrentUser);
router.post("/become-artist", protectRoute, becomeArtist);
router.get("/", protectRoute, getAllUsers);
router.get("/messages/:userId", protectRoute, getMessages);

export default router;
