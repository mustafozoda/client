import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ExternalLink } from "lucide-react";

const Map = () => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [userCoords, setUserCoords] = useState(null);
  const mapId = "map-container";

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCoords({ latitude, longitude });

        if (!mapRef.current && mapContainerRef.current) {
          mapRef.current = L.map(mapContainerRef.current, {
            zoomControl: false,
          }).setView([latitude, longitude], 15);

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "",
          }).addTo(mapRef.current);

          L.marker([latitude, longitude]).addTo(mapRef.current).openPopup();
        }
      },
      () => {
        alert("Unable to retrieve your location");
      },
    );

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      id={mapId}
      className="relative h-[15vh] rounded-lg border shadow-lg"
    >
      <ExternalLink
        color="#0078D4"
        size={24}
        className="absolute right-2 top-2 z-[500] cursor-pointer"
        onClick={() =>
          window.open(
            `https://www.google.com/maps?q=${userCoords?.latitude},${userCoords?.longitude}`,
            "_blank",
          )
        }
      />
    </div>
  );
};

export default Map;
