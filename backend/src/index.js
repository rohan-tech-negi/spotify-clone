import express from "express";
import dotenv from "dotenv";
import { clerkClient, clerkMiddleware, getAuth } from '@clerk/express'
import fileUpload from "express-fileupload"

import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.route.js"
import adminRoutes from "./routes/admin.route.js"
import albumRoutes from "./routes/album.route.js"
import authRoutes from "./routes/auth.route.js"
import songRoutes from "./routes/song.route.js"
import statRoutes from "./routes/stat.route.js"


dotenv.config();

connectDB();
const app = express();

app.use(express.json());

app.use(clerkMiddleware())
app.use(fileUpload({useTempFiles: true, tempFileDir: '/tmp'}))


app.use("/api/users", userRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/albums", albumRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/songs", songRoutes)
app.use("/api/stats", statRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
