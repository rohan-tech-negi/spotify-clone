import { Router } from "express";


const router = Router();

router.get("/admin", (req, res)=>{
    res.send("Admin");
})

export default router;

