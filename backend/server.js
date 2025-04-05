import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import homepageRouter from "./routes/homepageRouter.js";
import newsFeedRouter from "./routes/newsFeedRouter.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/api", homepageRouter);
app.use("/api", newsFeedRouter);
app.listen(process.env.PORT, () => {
  console.log(`server running in PORT: ${process.env.PORT}`);
});
