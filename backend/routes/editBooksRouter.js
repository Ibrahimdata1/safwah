import express from "express";
import prisma from "../utils/prismaClient.js";
const router = express.Router();
router.put("/edit/:matnId", async (req, res) => {
  const { matnId } = req.params;
  const { matnText } = req.body;
  try {
    const matnUpdated = await prisma.matn.update({
      where: {
        id: matnId,
      },
      data: {
        matnText,
      },
    });
    res.status(200).json({ data: matnUpdated });
  } catch (error) {
    console.error("error update matn 500", error);
    res.status(500).json({ error });
  }
});
router.put("/edit/:sharhId", async (req, res) => {
  const { sharhId } = req.params;
  const { sharhText, scholar } = req.body;
  try {
    const sharhUpdated = await prisma.sharh.update({
      where: {
        id: sharhId,
      },
      data: {
        sharhText,
        scholar,
      },
    });
    res.status(200).json({ data: sharhUpdated });
  } catch (error) {
    console.error("error update sharh 500", error);
    res.status(500).json({ error });
  }
});
router.put("/edit/:footnoteId", async (req, res) => {
  const { footnoteId } = req.params;
  const { footnoteText } = req.body;
  try {
    const footnoteUpdated = await prisma.footnote.update({
      where: {
        id: footnoteId,
      },
      data: {
        footnoteText,
      },
    });
    res.status(200).json({ data: footnoteUpdated });
  } catch (error) {
    console.error("error update footnote 500", error);
    res.status(500).json({ error });
  }
});
router.delete("/edit/matn/:matnId", async (req, res) => {
  const { matnId } = req.params;
  try {
    await prisma.matn.delete({
      where: {
        id: matnId,
      },
    });
    res.status(200).json({ data: "Delete success!" });
  } catch (error) {
    console.error("Delete Matn Error 500", error);
    res.status(500).json({ error });
  }
});
router.delete("/edit/sharh/:sharhId", async (req, res) => {
  const { sharhId } = req.params;
  try {
    await prisma.sharh.delete({
      where: {
        id: sharhId,
      },
    });
    res.status(200).json({ data: "Delete Sharh Success!" });
  } catch (error) {
    console.error("Delete Sharh Error 500", error);
    res.status(500).json({ error });
  }
});
router.delete("/edit/footnotes/:footnoteId", async (req, res) => {
  const { footnoteId } = req.params;
  try {
    await prisma.footnote.delete({
      where: {
        id: footnoteId,
      },
    });
    res.status(200).json({ data: "Delete Footnote Success!" });
  } catch (error) {
    console.error("Delete Footnote Error 500", error);
    res.status(500).json({ error });
  }
});
export default router;
