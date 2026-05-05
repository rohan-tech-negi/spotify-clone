
import { Router } from "express";


const router = Router();

router.get("/stats", (req, res)=>{
    res.send("stats");
})

export default router;