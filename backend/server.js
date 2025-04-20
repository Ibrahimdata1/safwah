import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import authRouter from "./routes/authRouter.js";
import newsFeedRouter from "./routes/newsFeedRouter.js";
import muslimNewsRouter from "./routes/muslimNewsRouter.js";
import threadRouter from "./routes/threadRouter.js";
import usersRouter from "./routes/usersRouter.js";
import booksRouter from "./routes/booksRouter.js";
import editBooksRouter from "./routes/editBooksRouter.js";
import path from "path";
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
app.use("/api", booksRouter);
app.use("/api", editBooksRouter);

app.listen(process.env.PORT, () => {
  console.log(`server running in PORT: ${process.env.PORT}`);
});
