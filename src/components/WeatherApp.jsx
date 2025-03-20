import React, { useState, useEffect } from "react";
import axios from "axios";

const APP_API_KEY = "6519c231c5bb4c8713e0e3fe3e709d6b";

import clearr from "../assets/clearr.mp4";
import clouds from "../assets/cloudy.mp4";
import rain from "../assets/rainy.mp4";
import snow from "../assets/snowy.mp4";

const getBackgroundImage = (weatherMain) => {
  const backgrounds = {
    Clear: clearr,
    Clouds: clouds,
    Rain: rain,
    Snow: snow,
  };
  return backgrounds[weatherMain] || "";
};

const WeatherCard = ({ weatherData, forecast }) => {
  const currentDate = new Date();
  const formattedTime = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const formattedDate = currentDate.toLocaleDateString([], {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
  const bgMedia = getBackgroundImage(weatherData.weather[0].main);

  return (
    <div className="relative rounded-[5px] bg-[#FFFFFF] p-1 shadow-lg transition-colors dark:bg-[#171717] dark:text-white">
      {/* Video Background */}
      {bgMedia && (
        <video
          className="absolute left-0 top-0 h-full w-full rounded-[5px] object-cover opacity-85"
          src={bgMedia}
          autoPlay
          loop
          muted
        />
      )}

      <div className="relative z-10 flex items-start justify-between">
        <p className="text-base font-bold">{weatherData.weather[0].main}</p>
        <div className="text-right">
          <p className="text-base">{formattedTime}</p>
          <p className="text-sm opacity-80">{formattedDate}</p>
        </div>
      </div>
      <p className="relative z-10 text-2xl font-bold">
        {Math.round(weatherData.main.temp)}°C
      </p>
      <p className="relative z-10 text-base">{weatherData.name}</p>

      {/* Real Forecast Data */}
      <div className="relative z-10 flex justify-between text-sm opacity-80">
        {forecast.map((day, index) => (
          <p key={index}>
            {day.day} {day.icon}
          </p>
        ))}
      </div>
    </div>
  );
};

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          // Fetch current weather
          const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APP_API_KEY}&units=metric`,
          );

          // Fetch 5-day forecast
          const forecastResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APP_API_KEY}&units=metric`,
          );

          setWeatherData(weatherResponse.data);

          // Process forecast data to get daily predictions
          const dailyForecast = processForecast(forecastResponse.data.list);
          setForecast(dailyForecast);
        } catch (err) {
          setError("Failed to fetch weather data.");
        }
      },
      () => setError("Location access denied."),
    );
  }, []);

  return (
    <div className="">
      {weatherData ? (
        <WeatherCard weatherData={weatherData} forecast={forecast} />
      ) : (
        <p className="text-center text-red-600">{error || "Loading..."}</p>
      )}
    </div>
  );
};

const processForecast = (forecastList) => {
  const dailyData = {};
  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString([], { weekday: "short" });

    if (!dailyData[day]) {
      dailyData[day] = item;
    }
  });

  const weatherIcons = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧",
    Snow: "❄️",
    Thunderstorm: "⛈",
    Drizzle: "🌦",
    Mist: "🌫",
    Haze: "🌫",
    Fog: "🌫",
  };

  return Object.keys(dailyData)
    .slice(1, 5)
    .map((day) => ({
      day,
      icon: weatherIcons[dailyData[day].weather[0].main] || "🌍",
    }));
};

export default WeatherApp;
