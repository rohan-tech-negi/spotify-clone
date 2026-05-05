import { Router } from "express";


const router = Router();

router.get("/albums", (req, res)=>{
    res.send("albums");
})

export default router;