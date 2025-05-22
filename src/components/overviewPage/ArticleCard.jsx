import React, { useState, useEffect } from "react";
import SkeletonLoader from "../SkeletonLoader";
import { ArrowBigRightDash, ArrowBigLeftDash } from "lucide-react";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const API_URL = `https://newsapi.org/v2/everything?q=technology+computer+science&apiKey=${API_KEY}`;
const CACHE_KEY = "cachedArticles";
const CACHE_TIME_KEY = "cachedTime";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

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
        if (response.status === 429) {
          throw new Error("Too many requests - rate limit exceeded");
        }
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        if (data.status === "ok" && data.articles.length > 0) {
          const top15 = data.articles.slice(0, 15);
          setArticles(top15);
          localStorage.setItem(CACHE_KEY, JSON.stringify(top15));
          localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
        } else {
          throw new Error("No articles found");
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          setArticles(JSON.parse(cached));
        } else {
          setArticles([]);
        }
      } finally {
        setLoading(false);
      }
    };

    const loadArticles = () => {
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cachedTime = Number(localStorage.getItem(CACHE_TIME_KEY) || 0);
      const isLocalhost =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

      if (!isLocalhost && cachedData) {
        setArticles(JSON.parse(cachedData));
        setLoading(false);
        if (Date.now() - cachedTime > CACHE_DURATION) {
          fetchAndCache();
        }
        return;
      }

      if (cachedData && Date.now() - cachedTime < CACHE_DURATION) {
        setArticles(JSON.parse(cachedData));
        setLoading(false);
      } else {
        fetchAndCache();
      }
    };

    loadArticles();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex < articles.length - 3 ? prevIndex + 1 : 0,
      );
    }, 10000);
    return () => clearInterval(interval);
  }, [articles]);

  const goNext = () => {
    if (currentIndex < articles.length - 3)
      setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <div className="relative mx-auto h-full w-full overflow-hidden">
      <div
        className="flex h-full w-full transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
      >
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-[100%] min-w-[33%] px-2 py-[8px]">
                <SkeletonLoader />
              </div>
            ))
          : articles.map((article, index) => (
              <div
                key={index}
                className="h-[100%] min-w-[33%] cursor-pointer px-2 py-[8px]"
              >
                <div className="h-full rounded-[5px] bg-white transition-transform duration-300 ease-in-out hover:scale-105 dark:bg-[#171717] dark:text-gray-300">
                  <img
                    src={article.urlToImage || "sth"}
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
