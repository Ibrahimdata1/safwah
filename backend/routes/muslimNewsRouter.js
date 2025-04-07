import express from "express";
import Parser from "rss-parser";
import prisma from "../utils/prismaClient.js";
import * as cheerio from "cheerio";
import axios from "axios";
const parser = new Parser();
const router = express.Router();

router.get("/muslimNews", async (req, res) => {
  try {
    const feed = await parser.parseURL(
      "https://www.aljazeera.com/xml/rss/all.xml"
    );
    const newsData = feed.items.slice(0, 25);
    await Promise.all(
      newsData.map(async (item) => {
        const exist = await prisma.Post.findFirst({
          where: { title: item.title },
        });
        if (!exist) {
          const res = await axios.get(item.link);
          const html = res.data;
          const $ = cheerio.load(html);
          const rawImage =
            $("img").first().attr("src") || $("img").first().attr("data-src");
          const baseUrl = new URL(item.link).origin;
          const image = baseUrl + rawImage;
          return await prisma.Post.create({
            data: {
              title: item.title,
              content: item.contentSnippet ?? item.content ?? "No Content..",
              image: image ?? null,
              type: "news",
            },
          });
        }
        return null;
      })
    );
    res.status(200).json({ message: "success!" });
  } catch (error) {
    console.error("❌ Fetch news error:", error);
    res.status(500).json({ error });
  }
});
export default router;
