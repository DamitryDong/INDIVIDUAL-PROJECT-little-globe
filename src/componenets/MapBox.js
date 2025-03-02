"use client";

import { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";

// Securely load Mapbox API token
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN;

function MapBoxMap( {postObj, handleClickOnMain} ) {
  const [selectedCordinates, setSelectedCordinates] = useState(null);
  const mapRef = useRef(null); // this is Used for a ref to store the map instance so we can call it again with the second useeffect without resetting the map
  const markerRef = useRef(null); // this is Used for a ref to store the marker instance so we can remove the previous marker when a new one is made.
  const lastClickTime = useRef(0); // this is Used for a ref for click time so I can see when a double click is made.


  useEffect(() => {
    // THIS IS REQUIRED, THIS MAKES SURE THAT THIS IS ONLY RAN WEN WE HAVE DATA
    if (!postObj || !Array.isArray(postObj) || postObj.length === 0) return;

    // Initialize Mapbox
    mapboxgl.accessToken = MAPBOX_TOKEN;

    // Create a new Mapbox map instance
    const map = new mapboxgl.Map({
      container: "mapContainer", // The ID of the element where the map will be displayed
      style: "mapbox://styles/mapbox/streets-v11", // Map style
      center: [postObj[0].longitude, postObj[0].latitude], // Longitude, Latitude of first post
      zoom: 2, // Zoom level
    });

    mapRef.current = map;  // Store the map instance in the ref

    // Add the Map coordinates from postObj
    postObj.forEach((post) => {
      if (post.latitude && post.longitude) {
      new mapboxgl.Marker()
        .setLngLat([post.longitude, post.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`<h1>${post.name}</h1><p>${post.description}</p>`))
        .addTo(map);
      }
    })

    // ADd cortdinates to state for usage when double clicked
    map.on("contextmenu", (e) => {
      const currentTime = Date.now();
      const timeDiff = currentTime - lastClickTime.current;

      if (timeDiff < 300) { 
        const { lng, lat } = e.lngLat; // Get the longitude and latitude of the clicked point
        setSelectedCordinates({ longitude: lng, latitude: lat }); // Store coordinates in state
        handleClickOnMain({ longitude: lng, latitude: lat }); // Call the parent function
      }

      lastClickTime.current = currentTime; // update the last click time if the if statement is false (this is the else)

    });


    // Cleanup map on component unmount
    return () => {
      map.remove();
    };
  }, [postObj]);

  useEffect(() => { // this useeffect refreshes everytime theres a new selected cordinates and adds a new marker
    if (!selectedCordinates) return;

    if (markerRef.current) {
      markerRef.current.remove(); // Remove the previous marker
    }

    const temporaryMarker = new mapboxgl.Marker({
      color: 'red'  // Change the marker color to red this is buuild in class style from mapgl
    })
        .setLngLat([selectedCordinates.longitude, selectedCordinates.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`<h1>New Post Location!</h1>`))
        .addTo(mapRef.current);

    // stores the marker in ref so we can remove it with the previous if sttatment
    markerRef.current = temporaryMarker;

  }, [selectedCordinates]);

  return (
            <div
            id="mapContainer"
            className="w-full h-full shadow-lg bg-transparent z-10"
            >
            </div>
  );
}

export default MapBoxMap;
