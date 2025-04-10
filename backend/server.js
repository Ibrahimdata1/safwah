import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import authRouter from "./routes/authRouter.js";
import newsFeedRouter from "./routes/newsFeedRouter.js";
import muslimNewsRouter from "./routes/muslimNewsRouter.js";
import threadRouter from "./routes/threadRouter.js";
import usersRouter from "./routes/usersRouter.js";
import path from "path";
import cron from "node-cron";
import axios from "axios";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/auth", authRouter);
app.use("/api", newsFeedRouter);
app.use("/api", muslimNewsRouter);
app.use("/api", threadRouter);
app.use("/api", usersRouter);
cron.schedule("0 * * * *", async () => {
  try {
    console.log("⏰ Syncing Muslim news...");
    await axios.get("http://localhost:8080/api/muslimNews");
  } catch (error) {
    console.error("❌ Error syncing news:", error);
  }
});
app.listen(process.env.PORT, () => {
  console.log(`server running in PORT: ${process.env.PORT}`);
});
