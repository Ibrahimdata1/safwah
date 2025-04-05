import express from "express";
import prisma from "../utils/prismaClient.js";
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
  const { title, content } = req.body;
  try {
    const newPost = await prisma.Post.create({
      data: {
        title,
        content,
      },
    });
    res.status(201).json({ data: newPost });
  } catch (error) {
    console.error("error newsFeed", error);
    res.status(500).json({ error });
  }
});
export default router;
