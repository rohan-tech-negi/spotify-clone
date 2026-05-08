
import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/admin.middleware.js";
// import { getStats } from "../controllers/statController.js";
import { getStats } from "../controllers/statController.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getStats);
export default router;