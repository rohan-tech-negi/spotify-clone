import express from "express";
import dotenv from "dotenv";



dotenv.config();

const app = express();


app.use("/api/users", )

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
