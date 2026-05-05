import { Router } from "express";


const router = Router();

router.get("/songs", (req, res)=>{
    res.send("songs");
})

export default router;