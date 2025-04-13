import express from "express";
import prisma from "../utils/prismaClient.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
router.get("/books", async (req, res) => {
  try {
    const books = await prisma.Books.findMany({
      include: {
        matn: true,
      },
    });
    res.status(200).json({ data: books });
  } catch (error) {
    console.error("getBook error 500", error);
    res.status(500).json({ error });
  }
});
router.get("/books/:bookId", async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = prisma.books.findUnique({
      where: {
        id: bookId,
      },
    });
    res.status(200).json({ data: book });
  } catch (error) {
    console.error("get book from bookId error 500", error);
    res.status(500).json({ error });
  }
});
router.get("/books/:bookId/matn", async (req, res) => {
  const { bookId } = req.params;
  try {
    const matn = await prisma.matn.findMany({
      where: {
        bookId,
      },
      include: {
        sharh: true,
      },
      orderBy: {
        order: "asc",
      },
    });
    res.status(200).json({ data: matn });
  } catch (error) {
    console.error("error fetch matn from bookId error 500", error);
    res.status(500).json({ error });
  }
});
router.post("/books/:bookId/matn", async (req, res) => {
  const { bookId } = req.params;
  const { arText, engText } = req.body;
  if (!bookId || !arText) {
    console.error("missing bookId or arText from post matn");
    return res.status(400).json({ error: "bookId and arText are required." });
  }
  try {
    const count = await prisma.matn.count({
      where: {
        bookId,
      },
    });
    const newmatn = await prisma.matn.create({
      data: {
        bookId,
        arText,
        engText,
        order: count + 1,
      },
    });
    res.status(201).json({ data: newmatn });
  } catch (error) {
    console.error("post new matn error 500", error);
    res.status(500).json({ error });
  }
});
router.post("/books/:matnId/sharh", async (req, res) => {
  const { matnId } = req.params;
  const { arExplain, engExplain, scholar } = req.body;
  try {
    const newSharh = await prisma.sharh.create({
      data: {
        matnId,
        arExplain,
        engExplain,
        scholar,
      },
    });
    res.status(201).json({ data: newSharh });
  } catch (error) {
    console.error("error add new sharh 500", error);
    res.status(500).json({ error });
  }
});
router.post("/books", async (req, res) => {
  try {
    const { title, author, description, coverUrl } = req.body;
    const newBook = await prisma.books.create({
      data: {
        title,
        author,
        description,
        coverUrl,
      },
    });
    res.status(201).json({ data: newBook });
  } catch (error) {
    console.error("postBook error 500", error);
    res.status(500).json({ error });
  }
});
router.post("/books/upload", (req, res) => {
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
