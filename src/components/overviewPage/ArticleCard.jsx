import React, { useState, useEffect } from "react";
import SkeletonLoader from "../SkeletonLoader";
import { ArrowBigRightDash, ArrowBigLeftDash } from "lucide-react";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const API_URL =
  import.meta.env.MODE === "production"
    ? "/articles.json"
    : `https://newsapi.org/v2/everything?q=technology+computer+science&apiKey=${API_KEY}`;

const truncateText = (text, limit = 5) => {
  const words = text.split(" ");
  return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
};

const ArticleCard = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchAndCache = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
        const data = await response.json();
        const list = Array.isArray(data) ? data : data.articles;
        setArticles(list.slice(0, 15));
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAndCache();
  }, []);

  useEffect(() => {
    if (!articles.length) return;
    const iv = setInterval(() => {
      setCurrentIndex((i) => (i < articles.length - 3 ? i + 1 : 0));
    }, 10000);
    return () => clearInterval(iv);
  }, [articles]);

  const goNext = () => {
    if (currentIndex < articles.length - 3) setCurrentIndex((i) => i + 1);
  };
  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  return (
    <div className="relative mx-auto h-full w-full overflow-hidden">
      <div
        className="flex h-full w-full transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
      >
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-[100%] min-w-[33%] px-2 py-[8px]">
                <SkeletonLoader />
              </div>
            ))
          : articles.map((article, idx) => (
              <div
                key={idx}
                className="h-[100%] min-w-[33%] cursor-pointer px-2 py-[8px]"
              >
                <div className="h-full rounded-[5px] bg-white transition-transform duration-300 ease-in-out hover:scale-105 dark:bg-[#171717] dark:text-gray-300">
                  <img
                    src={article.urlToImage || undefined}
                    alt="Image"
                    className="h-40 w-full rounded-t-lg object-cover p-[5px]"
                  />
                  <div className="p-4">
                    <h3 className="truncate font-semibold">
                      {truncateText(article.title || "")}
                    </h3>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block text-blue-500 underline hover:text-blue-700"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              </div>
            ))}
      </div>

      <ArrowBigLeftDash
        size={40}
        color="#007bff"
        onClick={goPrev}
        className={`absolute left-0 top-1/2 -translate-y-1/2 transform cursor-pointer rounded-full bg-white transition-opacity duration-300 hover:opacity-100 dark:bg-black ${
          currentIndex === 0 ? "pointer-events-none opacity-0" : "opacity-50"
        }`}
      />
      <ArrowBigRightDash
        size={40}
        color="#007bff"
        onClick={goNext}
        className={`absolute right-0 top-1/2 -translate-y-1/2 transform cursor-pointer rounded-full bg-white transition-opacity duration-300 hover:opacity-100 dark:bg-black ${
          currentIndex >= articles.length - 3
            ? "pointer-events-none opacity-0"
            : "opacity-50"
        }`}
      />
    </div>
  );
};

export default ArticleCard;
