import express from "express";
import prisma from "../utils/prismaClient.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
router.get("/newsFeed", async (req, res) => {
  try {
    const data = await prisma.Post.findMany({ orderBy: { createdAt: "desc" } });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
});
router.post("/newsFeed", async (req, res) => {
  const { title, content, image, type } = req.body;
  try {
    const newPost = await prisma.Post.create({
      data: {
        title,
        content,
        image,
        type,
      },
    });
    res.status(201).json({ data: newPost });
  } catch (error) {
    console.error("error newsFeed", error);
    res.status(500).json({ error });
  }
});
router.post("/newsFeed/upload", (req, res) => {
  if (!req.files || !req.files.image) {
    return res.status(400).json({ message: "No File Upload!" });
  }
  const file = req.files.image;
  const uploadPath = path.join(__dirname, "..", "uploads", file.name);
  file.mv(uploadPath, (error) => {
    if (error) {
      console.error("Upload error:", error); // เพิ่มบรรทัดนี้
      return res.status(500).json({ error });
    }
    res.status(200).json({ message: "upload pic success!" });
  });
});
export default router;
