import express from "express";
import prisma from "../utils/prismaClient.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
router.get("/books", async (req, res) => {
  try {
    const books = await prisma.Books.findMany({});
    res.status(200).json({ data: books });
  } catch (error) {
    console.error("getBook error 500", error);
    res.status(500).json({ error });
  }
});
router.get("/books/:bookId", async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await prisma.Books.findUnique({
      where: {
        id: bookId,
      },
    });
    res.status(200).json({ data: book });
  } catch (error) {
    console.error("get singlebook error 500", error);
    res.status(500).json({ error });
  }
});
router.get("/books/:bookId/paragraphs", async (req, res) => {
  const { bookId } = req.params;
  try {
    const paragraphs = await prisma.Paragraphs.findMany({
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
    res.status(200).json({ data: paragraphs });
  } catch (error) {
    console.error("error fetch paragraphs from bookId error 500", error);
    res.status(500).json({ error });
  }
});
router.post("/books", async (req, res) => {
  try {
    const { title, author, description, coverUrl } = req.body;
    const newBook = await prisma.Books.create({
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
