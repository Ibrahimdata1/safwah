import express from "express";
import prisma from "../utils/prismaClient.js";
const router = express.Router();

router.get("/allThreads", async (req, res) => {
  try {
    const allThreads = await prisma.Threads.findMany();
    res.status(200).json({ data: allThreads });
  } catch (error) {
    console.error("failed get allthreads 500", error);
    res.status(500).json({ error });
  }
});
router.post("/allThreads", async (req, res) => {
  try {
    const { topic, content, userId } = req.body;
    const newThread = await prisma.Threads.create({
      data: {
        topic,
        content,
        userId,
      },
    });
    res.status(201).json({ data: newThread });
  } catch (error) {
    console.error("failed post allthreads 500", error);
    res.status(500).json({ error });
  }
});
export default router;
