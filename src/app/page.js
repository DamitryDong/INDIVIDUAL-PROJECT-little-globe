'use client'

import React, {useState, useEffect} from "react";
import { SlideoutFrame } from "@/componenets/SlideoutFrame";
import MapBoxMap from "@/componenets/MapBox";
import CardSection from "@/componenets/postCards/CardsSection";
import { LocationSearchNPost } from "@/componenets/LocationSearch";
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
    <div className="flex flex-col md:flex-row justify-center bg-white h-screen">
      {/* Left Section */}
        <SlideoutFrame buttonName="Discover" position="left" autoClose={true} backgroundTrans="bg-transparent">
          <CardSection postObj={posts} />
        </SlideoutFrame>

      {/* Middle Section (Map) */}
      <div className="w-full h-screen bg-white dark:bg-gray-800">
        <MapBoxMap postObj={posts} handleClickOnMain={handdleLocationClick}/>
      </div>

      {/* Right Section */}
      <SlideoutFrame buttonName="Post" position="right" backDrop={false} buttonPosition={"right-5"} shadow="shadow-lg">
        <LocationSearchNPost clickedLocation={clickedLocation} />
      </SlideoutFrame>
    </div>
  );
}
