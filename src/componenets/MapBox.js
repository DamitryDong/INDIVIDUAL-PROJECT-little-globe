"use client";

import { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useTheme } from "@/utils/context/ThemeContext";
import FadeIn from "./GsapAnimation/MapLoad";
import ScaleOpenAnimation from "./GsapAnimation/MapFirstLoad";
import { useAuth } from "@/utils/context/authContext";

// Securely load Mapbox API token
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN;

function MapBoxMap( {postObj, handleClickOnMain} ) {
  const [selectedCordinates, setSelectedCordinates] = useState(null); // set staet of the cordinates we put on to pass through.c
  const [maploaded, setMapLoaded] = useState(false); // This is use so we can run the animation AFTER map is loaded else it breaks. 
  const mapRef = useRef(null); // this is Used for a ref to store the map instance so we can call it again with the second useeffect without resetting the map
  const markerRef = useRef(null); // this is Used for a ref to store the marker instance so we can remove the previous marker when a new one is made.
  const lastClickTime = useRef(0); // this is Used for a ref for click time so I can see when a double click is made.

  const { darkTheme } = useTheme(); // this is used to get the darkTheme value from the context (the toggle is triggered by the darktheme button on navbar)
  const { user } = useAuth();

  useEffect(() => {
    // THIS IS REQUIRED, THIS MAKES SURE THAT THIS IS ONLY RAN WEN WE HAVE DATA
    if (!postObj || !Array.isArray(postObj) || postObj.length === 0)  return;

    // Initialize Mapbox
    mapboxgl.accessToken = MAPBOX_TOKEN;

    // Create a new Mapbox map instance
    const map = new mapboxgl.Map({
      container: "mapContainer", // The ID of the element where the map will be displayed

      style: darkTheme ? 'mapbox://styles/mapbox/navigation-night-v1' : 'mapbox://styles/mapbox/streets-v11', 
      // // map theme passing a way to trigger dark mode note the syntax.. ALSO this is only the original state, there's another useeffect to trigger to rerender when change.

      center: [postObj[0].longitude, postObj[0].latitude], // Longitude, Latitude of first post
      zoom: 2, // Zoom level
    });

    map.on("load", () => setMapLoaded(true)); // Set map loaded state to true when map is loaded so we can run animation.
    map.doubleClickZoom.disable(); // Disable double click zoom since we're using double click to mark
    mapRef.current = map;  // Store the ma  p instance in the ref
    
    // Add the Map coordinates from postObj
    postObj.forEach((post) => {
      if (post.latitude && post.longitude) {
        if (post.uid === user.uid) {
          new mapboxgl.Marker({color: "red"})
          .setLngLat([post.longitude, post.latitude])
          .setPopup(new mapboxgl.Popup().setHTML(
            `
            <div class="flex flex-col items-center justify-start text-center overflow-hidden">
              <img src="${post.imageUrl}" style="width: 80px; height: auto; border-radius: 2px; margin-bottom: 8px" />
              <h1 class="text-sm sm:text-xs md:text-xs text-black"><strong>${post.locationName}</strong></h1>
              <p class="text-xs sm:text-xs md:text-[10px] text-black">${post.caption}</p>
            </div>

            `
          ))
          .addTo(map);
        }
        else {
          new mapboxgl.Marker()
          .setLngLat([post.longitude, post.latitude])
          .setPopup(new mapboxgl.Popup().setHTML(
            `
            <div class="flex flex-col items-center justify-start text-center overflow-hidden">
              <img src="${post.imageUrl}" style="width: 80px; height: auto; border-radius: 2px; margin-bottom: 8px" />
              <h1 class="text-sm sm:text-xs md:text-xs text-black"><strong>${post.locationName}</strong></h1>
              <p class="text-xs sm:text-xs md:text-[10px] text-black">${post.caption}</p>
            </div>

            `
          ))
          .addTo(map);
        }
      }
    })

    // ADd cortdinates to state for usage when double clicked
    map.on("click", (e) => {
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
  }, [postObj, darkTheme]);

  
  // THIS IS ANOTHER USEEFFECT TO TRIGGER AND RERENDER THE MAP STYLE WHEN DARKTHEME IS CHANGED
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setStyle(
        darkTheme
          ? "mapbox://styles/mapbox/navigation-night-v1"
          : "mapbox://styles/mapbox/streets-v11"
      );
    }
  }, [darkTheme]); // Runs when `darkTheme` changes



  useEffect(() => { // this useeffect refreshes everytime theres a new selected cordinates and adds a new marker
    if (!selectedCordinates) return;

    if (markerRef.current) {
      markerRef.current.remove(); // Remove the previous marker
    }

    const temporaryMarker = new mapboxgl.Marker({
      color: 'green'  // Change the marker color to red this is buuild in class style from mapgl
    })
        .setLngLat([selectedCordinates.longitude, selectedCordinates.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`<h1>New Post Location!</h1>`))
        .addTo(mapRef.current);

    // stores the marker in ref so we can remove it with the previous if sttatment
    markerRef.current = temporaryMarker;

  }, [selectedCordinates]);

  return (
    <ScaleOpenAnimation>
      <FadeIn key={darkTheme ? "dark" : "light"}>
        <div id="mapContainer" className={`w-full h-full bg-transparent ${maploaded ? '' : 'invisible'}`}> 
        </div>
      </FadeIn>
    </ScaleOpenAnimation>
  );
}

export default MapBoxMap;
