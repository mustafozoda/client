import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const API_KEY = process.env.VITE_NEWS_API_KEY;
const API_URL = `https://newsapi.org/v2/everything?q=technology+computer+science&apiKey=${API_KEY}`;
const OUT_FILE = path.resolve(process.cwd(), "public", "articles.json");
const TOP_N = 15;

async function main() {
  console.log("Fetching latest articles…");
  const resp = await fetch(API_URL);
  if (!resp.ok) throw new Error(`NewsAPI fetch failed: ${resp.status}`);
  const json = await resp.json();
  if (json.status !== "ok") throw new Error("Bad payload");
  const top15 = json.articles.slice(0, TOP_N);
  fs.writeFileSync(OUT_FILE, JSON.stringify(top15, null, 2), "utf-8");
  console.log(`Wrote ${top15.length} articles to ${OUT_FILE}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
