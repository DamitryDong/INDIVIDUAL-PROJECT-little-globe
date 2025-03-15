"use client";

import { Label, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { createPost, updatePost } from "@/api/postApi";
import { Button } from "flowbite-react";
import Gemini from "./Gemini";
import { useAuth } from "@/utils/context/authContext";

export function LocationSearchNPost({ clickedLocation, reloadmap, feedBackToMapLong, feedBackToMapLatit, handlePinpointInput }) {
  const [imageUrl, setImageFile] = useState("");
  const [isValidImage, setIsValidImage] = useState(true);
  const [locationName, setLocationName] = useState("");
  const [caption, setCaption] = useState("");
  const [reloadstate, setreloadstate] = useState(true)

  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  const {user} = useAuth();

  useEffect(() => {
    if (clickedLocation.latitude !== undefined) setLatitude(clickedLocation.latitude);
    if (clickedLocation.longitude !== undefined) setLongitude(clickedLocation.longitude);
    console.log(latitude);
    console.log(longitude);
  }, [clickedLocation]);

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

  const handleLongitude = (e) => {
    let value = e.target.value; // Store input as string to be evaluated, 
    if (value === "" || value === "-") {
      setLongitude(value); // Allow empty input and "-" while typing so it's ok to type an empty value without it erroring since we're not hard setting out output when its empty
    } else {
      let numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        numValue = Math.max(-180, Math.min(180, numValue)); // we can get the restricted value by getting the largest number of below 180 that we input. 
        setLongitude(numValue);
        feedBackToMapLong(numValue) // Additionally feedback the value to the map if it's a value
      }
    }
  };
  
  const handleLatitude = (e) => {
    let value = e.target.value;
    if (value === "" || value === "-") {
      setLatitude(value);
    } else {
      let numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        numValue = Math.max(-90, Math.min(90, numValue));
        setLatitude(numValue);
        feedBackToMapLatit(numValue)
      }
    }
  };
  
  const handleSubmit = () => {
    const payload = {
      longitude: longitude,
      latitude: latitude,
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

      setImageFile("")
      setLocationName("")
      setCaption("")
    })
  }
  

  return (
    <div className="flex max-w-md flex-col gap-2 bg-white p-4 rounded-lg dark:bg-gray-800 dark:text-white h-screen">

      {/* import the ai */}

      <Gemini />

      {/* Longitude */}
      <div>
        <Label htmlFor="longitude" color="success" value="Longitude ( -180, 180 )" />
        <TextInput
          color="success"
          id="longitude"
          type="text"
          value={longitude}
          onChange={handleLongitude}
          placeholder="-73.935242"
        />
      </div>

    {/* Latitude */}
      <div> 
        <Label htmlFor="latitude" color="success" value="Latitude ( -90, 90 ) " />
        <TextInput
          color="success"
          id="latitude"
          type="text"
          value={latitude}
          onChange={handleLatitude}
          placeholder="40.730610"
        />
      </div>

      <Button size="xs" outline gradientDuoTone="cyanToBlue" className="w-7 h-7 rounded-full" onClick={() => handlePinpointInput()}>Pin</Button> 

      {/* Location Name */}
      <div>
        <Label htmlFor="location-name" value="Where are you?" />
        <TextInput id="location-name" type="text" sizing="md" placeholder="New York City" value={locationName} onChange={(e) => setLocationName(e.target.value)} required/>
      </div>

      {/* Caption */}
      <div>
        <Label htmlFor="caption" value="Caption" />
        <TextInput id="caption" type="text" sizing="lg" placeholder="A lovely trip to the city" value={caption} onChange={(e) => setCaption(e.target.value)} required/>
      </div>

      {/* Image input area to displaya*/}
      <div
        className="border-2 border-dashed border-gray-300 p-4 mt-4 text-center rounded-lg cursor-pointer"
      >
        <Label htmlFor="image-upload" value="Put an Image Url" />
        <TextInput id="image-Url-Input" value={imageUrl} onChange={(e) => setImageFile(e.target.value)} className="mt-2" />
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
          Post
        </Button>

    </div>
  );
}
