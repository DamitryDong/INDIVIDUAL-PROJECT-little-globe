"use client";

import { Label, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { createPost, updatePost } from "@/api/postApi";
import { Button } from "flowbite-react";
import Gemini from "./Gemini";
import { useAuth } from "@/utils/context/authContext";

export function LocationSearchNPost({ clickedLocation, reloadmap }) {
  const [imageUrl, setImageFile] = useState(null);
  const [isValidImage, setIsValidImage] = useState(true);
  const [locationName, setLocationName] = useState("");
  const [caption, setCaption] = useState("");
  const [reloadstate, setreloadstate] = useState(true)

  const {user} = useAuth();

  useEffect(() => { //this is used to reset the image to true when after the image Url is change so we can check the next image
    setIsValidImage(true);
  }, [imageUrl]);

  if (!clickedLocation || !clickedLocation.longitude || !clickedLocation.latitude) {
    return (
      <div className=" p-4 text-center text-gray-800 dark:text-gray-100 font-semibold">
        Double click anywhere on the map to set a post!
      </div>
    );
  }
  
  const handleSubmit = () => {
    const payload = {
      longitude: clickedLocation.longitude,
      latitude: clickedLocation.latitude,
      locationName,
      caption,
      imageUrl,
      uid: user.uid,
    };
    createPost(payload).then((newPost) => { 
      const firebasekeypayload = {
        firebaseKey: newPost.name
      }
      updatePost(firebasekeypayload)
    }). then(() => {
      reloadmap(reloadstate);
      setreloadstate(!reloadstate)
    })
  }
  

  return (
    <div className="flex max-w-md flex-col gap-2 bg-white p-4 rounded-lg dark:bg-gray-800 dark:text-white h-screen">

      {/* import the ai */}

      <Gemini />

      {/* Longitude */}
      <div > 
        <Label htmlFor="longitude" value="Longitude"/>
        <TextInput id="longitude" style={{ cursor: 'default' }} type="text" sizing="sm" value={clickedLocation.longitude} color="success" readOnly />
      </div>

      {/* Latitude */}
      <div>
        <Label htmlFor="latitude" value="Latitude" />
        <TextInput id="latitude" style={{ cursor: 'default' }} type="text" sizing="sm" value={clickedLocation.latitude} color="success" readOnly />
      </div>

      {/* Location Name */}
      <div>
        <Label htmlFor="location-name" value="Where are you?" />
        <TextInput id="location-name" type="text" sizing="md" placeholder="New York City" value={locationName} onChange={(e) => setLocationName(e.target.value)}/>
      </div>

      {/* Caption */}
      <div>
        <Label htmlFor="caption" value="Caption" />
        <TextInput id="caption" type="text" sizing="lg" placeholder="A lovely trip to the city" value={caption} onChange={(e) => setCaption(e.target.value)} />
      </div>

      {/* Image input area to displaya*/}
      <div
        className="border-2 border-dashed border-gray-300 p-4 mt-4 text-center rounded-lg cursor-pointer"
      >
        <Label htmlFor="image-upload" value="Put an Image Url" />
        <TextInput id="image-Url-Input" onChange={(e) => setImageFile(e.target.value)} className="mt-2" />
        <p className="text-gray-500 text-sm mt-2 cursor-default">add a cute image!</p>
      </div>

      {/* Image Preview */}
      
      <div className="mt-4">
        {imageUrl && isValidImage ? (
          <>
            <p className="text-sm font-medium">Image:</p>
            <img
              src={imageUrl}
              alt="Image Preview"
              className="mt-2 rounded-lg max-h-40 object-cover"
              onError={() => setIsValidImage(false)} // If the image fails to load, mark it as invalid
            />
          </>
        ) : (
          <p className="text-sm font-medium">Not a valid image</p>
        )}
      </div>

        {/* Submit Button got it from flowbite*/}
        <Button outline gradientDuoTone="greenToBlue" onClick={handleSubmit}>
          Preview Post
        </Button>

    </div>
  );
}
