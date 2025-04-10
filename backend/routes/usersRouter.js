import express from "express";
import prisma from "../utils/prismaClient.js";
const router = express.Router();
router.get("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const getUser = await prisma.Users.findUnique({
      where: {
        id: userId,
      },
    });
    res.status(200).json({ data: getUser });
  } catch (error) {
    console.error("error find user 500", error);
    res.status(500).json({ error });
  }
});
export default router;
