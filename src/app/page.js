'use client'

import React, {useState, useEffect} from "react";
import { SlideoutFrame } from "@/componenets/SlideoutFrame";
import MapBoxMap from "@/componenets/MapBox";
import CardSection from "@/componenets/postCards/CardsSection";
import { LocationSearchNPost } from "@/componenets/LocationSearch";
import { getAllpost } from "@/api/postApi";
import { getSingleUserByUid } from "@/api/userApi";
import { useAuth } from "@/utils/context/authContext";
import { Badge } from "flowbite-react";

export default function Home() {
  const [posts, setPosts] = useState([])
  const [clickedLocation, setClickedLocation] = useState({})
  const [userSetup, setUserSetup] = useState(true)

  const {user} = useAuth()

  const handdleLocationClick = (location) => {
    setClickedLocation(location)
  }

  useEffect(() => {
    getAllpost().then((post) => {
      setPosts(post);
    });
  
    if (user?.uid) {  // Ensure user.uid exists before making the API call you don't need this since to get to the page you login to google and we know useauth will return something
      getSingleUserByUid(user.uid)
        .then((fetchedUser) => {
          if (!fetchedUser) {  // Check if user is null, if it is null, we set status to false (user not setup)
            setUserSetup(false);
          }
        })
        .catch((error) => console.error("Error fetching user:", error)); // good practice eerror call for everything!
    }
  }, [user]); // Run useEffect when `user` changes when we update user, could leave this out if you ar ecompletely remounting after, I'll think about what I want to do
  

  if (!userSetup) { // show a different return if it isn't setup
    return (
      <div className="flex items-center justify-center h-screen dark:bg-gray-800 dark:text-white" >
        <h1 className="text-2xl font-semibold">Please click your user Icon on the top and finish setup</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row justify-center bg-white h-screen">
      {/* Left Section */}
        <SlideoutFrame buttonName="Discover" position="left" autoClose={true} backgroundTrans="bg-transparent">
          <CardSection postObj={posts} />
        </SlideoutFrame>

      {/* Middle Section (Map) and the color dictionary thing*/}
      <div className="w-full h-screen bg-white dark:bg-gray-800">
        <MapBoxMap postObj={posts} handleClickOnMain={handdleLocationClick}/>
      </div>
      <div className="z-30 absolute right-[4%] top-[10%]">
      <Badge className="mb-[4%] bg-[#3fb1ce] text-white dark:text-black dark:bg-[#3fb1ce] shadow-md opacity-75" >Others Post</Badge>
      <Badge className="mb-[4%] bg-[#008000] text-white dark:text-black dark:bg-[#008000] shadow-md opacity-75" >Selected Location</Badge>
      <Badge className="mb-[4%] bg-[#ff0000] text-white dark:text-black dark:bg-[#ff0000] shadow-md opacity-75">Yours Post</Badge>
      </div>

      {/* Right Section */}
      <SlideoutFrame buttonName="Post" position="right" backDrop={false} buttonPosition={"right-5"} shadow="shadow-lg">
        <LocationSearchNPost clickedLocation={clickedLocation} />
      </SlideoutFrame>
    </div>
  );
}
