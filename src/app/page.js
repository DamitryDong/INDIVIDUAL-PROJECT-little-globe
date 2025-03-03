'use client'

import React, {useState, useEffect} from "react";
import { SlideoutFrame } from "@/componenets/SlideoutFrame";
import MapBoxMap from "@/componenets/MapBox";
import CardSection from "@/componenets/postCards/CardsSection";
import { LocationSearchNPost } from "@/componenets/LocationSearch";
import { getAllpost } from "@/api/postApi";
import { useAuth } from "@/utils/context/authContext";

export default function Home() {
  const [posts, setPosts] = useState([])
  const [clickedLocation, setClickedLocation] = useState({})
  const [userSetup, setUserSetup] = useState(false)

  const {user} = useAuth()

  const handdleLocationClick = (location) => {
    setClickedLocation(location)
  }

  useEffect(() => {
      getAllpost().then((post) => {
          setPosts(post)
      })
      console.log(user.uid)
  }, []);

  if (!userSetup) { // show a different return if it isn't setup
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <h1 className="text-2xl font-semibold text-gray-800">Please click your user Icon on the top and finish setup</h1>
        <button onClick={(e) => setUserSetup(!userSetup)}>ssss</button>
      </div>
    );
  }

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
