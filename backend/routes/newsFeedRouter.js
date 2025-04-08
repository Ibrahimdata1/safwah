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
router.get("/newsFeed/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  const comments = await prisma.Comments.findMany({ where: { postId } });
  res.status(200).json({ data: comments });
});
router.post("/newsFeed/:postId/comments", async (req, res) => {
  const { comment, userId, postId } = req.body;
  try {
    const saveComment = await prisma.Comments.create({
      data: {
        comment,
        postId,
        userId,
      },
    });
    res.status(201).json({ data: saveComment });
  } catch (error) {
    res.status(500).json({ error });
  }
});
router.get("/newsFeed/:postId/likes", async (req, res) => {
  const { postId } = req.params;
  try {
    const countLikes = await prisma.Likes.count({
      where: {
        postId,
      },
    });
    res.status(200).json({ data: countLikes });
  } catch (error) {
    console.error("error get likes 500", error);
  }
});
router.post("/newsFeed/:postId/likes", async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;
  try {
    const existing = await prisma.Likes.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
    if (existing) {
      await prisma.Likes.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
      return res.status(200).json({ message: "unlike done!" });
    } else {
      await prisma.Likes.create({
        data: {
          userId,
          postId,
        },
      });
      return res.status(201).json({ message: "Liked success!" });
    }
  } catch (error) {
    console.error("Like error 500", error);
  }
});
router.get("/newsFeed/:postId/likes/is-liked", async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.query;
  try {
    const liked = await prisma.Likes.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
    res.status(200).json({ data: !!liked });
  } catch (error) {
    console.error("error 500 cannot find liked status", error);
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
