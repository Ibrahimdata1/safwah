import express from "express";
import prisma from "../utils/prismaClient.js";
const router = express.Router();
router.get("/homepage", async (req, res) => {
  try {
    const data = await prisma.Homepage.findMany();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
});
export default router;
