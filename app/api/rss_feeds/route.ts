import RSSParser from "rss-parser";

export default async function handler(req: any, res: any) {
  const parser = new RSSParser();
  try {
    const feed = await parser.parseURL("https://www.tes.com/news/gcse-a-level");
    res.status(200).json(feed.items); // Send the feed items back to the client
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch RSS feed" });
  }
}
