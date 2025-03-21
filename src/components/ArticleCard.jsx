import React, { useState, useEffect } from "react";
import SkeletonLoader from "../components/SkeletonLoader";
import { ArrowBigRightDash, ArrowBigLeftDash } from "lucide-react";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const API_URL = `https://newsapi.org/v2/everything?q=technology+computer+science&apiKey=${API_KEY}`;
const truncateText = (text, limit = 5) => {
  const words = text.split(" ");
  return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
};

const ArticleCard = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);

      try {
        const cachedData = localStorage.getItem("cachedArticles");
        const cachedTime = Number(localStorage.getItem("cachedTime")); // Ensure it's a number

        // Check if data exists and is fresh (e.g., within 1 hour)
        if (
          cachedData &&
          cachedTime &&
          Date.now() - cachedTime < 60 * 60 * 1000
        ) {
          setArticles(JSON.parse(cachedData));
          setLoading(false); // Stop loading since cache is used
          return;
        }

        // Fetch fresh data if no valid cache
        const response = await fetch(API_URL);

        if (response.status === 429) {
          throw new Error("Too many requests - rate limit exceeded");
        }

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        if (data.status === "ok" && data.articles.length > 0) {
          setArticles(data.articles);
          localStorage.setItem("cachedArticles", JSON.stringify(data.articles));
          localStorage.setItem("cachedTime", Date.now().toString());
        } else {
          throw new Error("No articles found");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles([]);
        setLoading(true);
      }
    };

    fetchArticles();
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
    <div className="relative mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
      >
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="px-2 py-[8px]">
                <SkeletonLoader num_h={32} num_w={17.2} />
              </div>
            ))
          : articles.map((article, index) => (
              <div key={index} className="cursor-pointer px-2 py-[8px]">
                <div className="h-[32vh] w-[17.2vw] rounded-[5px] bg-white transition-transform duration-300 ease-in-out hover:scale-105 dark:bg-[#171717] dark:text-gray-300">
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

      {/* Prev Button */}
      <ArrowBigLeftDash
        size={40}
        color="#007bff"
        onClick={goPrev}
        className={`absolute left-0 top-1/2 -translate-y-1/2 transform cursor-pointer transition-opacity duration-300 hover:opacity-100 ${
          currentIndex === 0 ? "pointer-events-none opacity-0" : "opacity-50"
        }`}
      />

      {/* Next Button */}
      <ArrowBigRightDash
        size={40}
        color="#007bff"
        onClick={goNext}
        className={`absolute right-0 top-1/2 -translate-y-1/2 transform cursor-pointer transition-opacity duration-300 hover:opacity-100 ${
          currentIndex >= articles.length - 3
            ? "pointer-events-none opacity-0"
            : "opacity-50"
        }`}
      />
    </div>
  );
};

export default ArticleCard;
