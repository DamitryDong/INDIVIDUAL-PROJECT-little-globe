'use client'

import React, {useState, useEffect} from "react";
import { SlideoutFrame } from "@/componenets/SlideoutFrame";
import { SlideoutFrameforDiscovery } from "@/componenets/SlideoutforDiscover";
import MapBoxMap from "@/componenets/MapBox";
import CardSection from "@/componenets/postCards/CardsSection";
import { LocationSearchNPost } from "@/componenets/LocationSearch";
import { getAllpost } from "@/api/postApi";
import { getSingleUserByUid } from "@/api/userApi";
import { useAuth } from "@/utils/context/authContext";
import { Badge  } from "flowbite-react";
import { useTheme } from "@/utils/context/ThemeContext";

export default function Home() {
  const [posts, setPosts] = useState([])
  const [clickedLocation, setClickedLocation] = useState({})
  const [filteredMarks, setFilteredMarks] = useState("All")

  const [inputLongitude, SetInputLongitude] = useState()
  const [inputLatitude, SetInputLatitude] = useState()
  const [inputPinpoint, setInputPinpoint] = useState(false)

  const [userSetup, setUserSetup] = useState(true)
  const [reloadMap, setReloadMap] = useState(false)
  const [postFrameRe, setPostFrameRe] = useState(true)

  const {user} = useAuth()
  const {darkTheme} = useTheme()

  const handdleLocationClick = (location) => {
    setClickedLocation(location)
  }

  const handleLongitudeInput = (longitude) => {
    console.log(`set longitude is ${longitude}`)
    SetInputLongitude(longitude)
  }

  const handleLatitudeInput = (Latitude) => {
    console.log(`set latitude is ${Latitude}`)
    SetInputLatitude(Latitude)
  }

  const handlePinpointInput= () =>{
    setInputPinpoint(!inputPinpoint)
  }

  const handleClosingPostFrame = () => {
    setPostFrameRe(!postFrameRe)
  }

  useEffect(() => {
    SetInputLongitude(clickedLocation.longitude)
    SetInputLatitude(clickedLocation.latitude)
  },[clickedLocation])

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
  }, [user, reloadMap]); // Run useEffect when `user` changes when we update user, could leave this out if you ar ecompletely remounting after, I'll think about what I want to do
  

  if (!userSetup) { // show a different return if it isn't setup
    return (
      <div className="flex items-center justify-center h-screen dark:bg-gray-800 dark:text-white" >
        <h1 className="text-2xl font-semibold">Please click your user Icon on the top and finish setup</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-center bg-white min-h-screen w-full max-w-screen">
      {/* Left Section */}
        <SlideoutFrameforDiscovery buttonName="\discoverIcon.png" position="left" onOpen={handleClosingPostFrame}>
          <CardSection postObj={posts} />
        </SlideoutFrameforDiscovery>

      {/* Middle Section (Map) and the color dictionary thing*/}
      <div className={darkTheme ? "w-full h-screen bg-gray-800 text-white" : "w-full h-screen bg-white text-black"}>
        <MapBoxMap postObj={posts} handleClickOnMain={handdleLocationClick} inputLatitude={inputLatitude} inputLongitude={inputLongitude} pinpointInput={inputPinpoint} mapFilter={filteredMarks}/>
      </div>
      <div className="z-30 absolute left-[4%] bottom-[10%]">
      <Badge  size="xs" className="cursor-pointer mb-[4%] bg-[#3fb1ce] text-white dark:text-black dark:bg-[#3fb1ce] shadow-md opacity-75" onClick={() => setFilteredMarks("OtherPost")}>Others Post</Badge >
      <Badge  size="xs" className="cursor-pointer mb-[4%] bg-[#ff0000] text-white dark:text-black dark:bg-[#ff0000] shadow-md opacity-75" onClick={() => setFilteredMarks("MyPost")}>Yours Post</Badge >
      <Badge  size="xs" className="cursor-pointer mb-[4%] bg-[#19a152] text-white dark:text-black dark:bg-[#19a152] shadow-md opacity-75" onClick={() => setFilteredMarks("All")}>All Post</Badge >
      </div>

      {/* Right Section */}

      <SlideoutFrame buttonName="\newPostIcon.png" position="right" backDrop={false} buttonPosition={"right-5"} shadow="shadow-lg" CloseFrameForDiscover={postFrameRe}>
        <LocationSearchNPost clickedLocation={clickedLocation} reloadmap={setReloadMap} feedBackToMapLong={handleLongitudeInput} feedBackToMapLatit={handleLatitudeInput} handlePinpointInput={handlePinpointInput}/>
      </SlideoutFrame>
    </div>
  );
}
