'use client'

import React, {useState, useEffect} from "react";
import { SlideoutFrame } from "@/componenets/SlideoutFrame";
import MapBoxMap from "@/componenets/MapBox";
import CardSection from "@/componenets/postCards/CardsSection";
import { LocationSearch } from "@/componenets/LocationSearch";
import { getAllpost } from "@/api/postApi";

export default function Home() {
  const [posts, setPosts] = useState([])
  const [clickedLocation, setClickedLocation] = useState({})

  const handdleLocationClick = (location) => {
    setClickedLocation(location)
  }

  useEffect(() => {
      getAllpost().then((post) => {
          setPosts(post)
      })
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-center bg-white text-black h-screen">
      {/* Left Section */}
      <div className="w-full md:w-1/4 bg-yellow-200 overflow-y-auto">
        <SlideoutFrame buttonName="Explore" position="left" autoClose={true}>
          <CardSection postObj={posts} />
        </SlideoutFrame>
      </div>

      {/* Middle Section (Map) */}
      <div className="w-full h-[50vh] md:h-screen md:w-full bg-slate-200">
        <MapBoxMap postObj={posts} handleClickOnMain={handdleLocationClick} />
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/4 bg-green-700">
      <SlideoutFrame buttonName="Post" position="right" backDrop={false}>
        <LocationSearch clickedLocation={clickedLocation} />
      </SlideoutFrame>
      </div>
    </div>
  );
}
