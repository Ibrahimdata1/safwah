import express from "express";
import bcrypt from "bcrypt";
import prisma from "../utils/prismaClient.js";
const router = express.Router();

router.post("/signUp", async (req, res) => {
  const { name, surname, password, email, userId } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const saveUser = await prisma.Users.create({
      data: { id: userId, name, surname, password: hashedPassword, email },
    });
    res.status(201).json({ user: saveUser });
  } catch (error) {
    console.error("error signUp 500", error);
    return res.status(500).json({ error });
  }
});
router.post("/signIn", async (req, res) => {
  const { email, password } = req.body;
});
export default router;
