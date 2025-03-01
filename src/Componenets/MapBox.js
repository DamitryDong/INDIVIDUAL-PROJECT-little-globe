"use client";

import { useEffect } from "react";
import mapboxgl from "mapbox-gl";

// Securely load Mapbox API token
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN;

function MapBoxMap() {
  useEffect(() => {
    // Initialize Mapbox
    mapboxgl.accessToken = MAPBOX_TOKEN;

    // Create a new Mapbox map instance
    const map = new mapboxgl.Map({
      container: "mapContainer", // The ID of the element where the map will be displayed
      style: "mapbox://styles/mapbox/streets-v11", // Map style
      center: [0, 0], // Longitude, Latitude
      zoom: 2, // Zoom level
    });

    // Cleanup map on component unmount
    return () => {
      map.remove();
    };
  }, []);

  return (
            <div
            id="mapContainer"
            className="w-full h-full rounded-full shadow-lg bg-transparent z-10"
            >
            </div>
  );
}

export default MapBoxMap;
