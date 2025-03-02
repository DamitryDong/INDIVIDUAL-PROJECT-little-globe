'use client'

import React, {useState, useEffect} from "react";
import MapBoxMap from "@/componenets/MapBox";
import CardSection from "@/componenets/postCards/CardsSection";
import { LocationSearch } from "@/componenets/LocationSearch";
import { getAllpost } from "@/api/postApi";

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
      getAllpost().then((post) => {
          setPosts(post)
      })
  }, [])

  return (
    <div className="flex flex-row justify-center bg-white text-black h-screen">

      <div className=" w-1/4 bg-yellow-200 overflow-y-auto">
        <CardSection postObj={posts}/>
      </div>

      <div className="w-1/2 h-screen bg-slate-200">
        <MapBoxMap postObj={posts}/>
      </div>

      <div className="w-1/4 bg-green-700"><LocationSearch/> </div>

    </div>
  );
}
