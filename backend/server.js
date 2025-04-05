import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRouter.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.listen(process.env.PORT, () => {
  console.log(`server running in PORT: ${process.env.PORT}`);
});
