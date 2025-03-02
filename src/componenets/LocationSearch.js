"use client";

import { Label, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { createPost } from "@/api/postApi";
import { Button } from "flowbite-react";

export function LocationSearch({ clickedLocation }) {
  const [imageUrl, setImageFile] = useState(null);
  const [isValidImage, setIsValidImage] = useState(true);
  const [locationName, setLocationName] = useState("");
  const [caption, setCaption] = useState("");

  useEffect(() => { //this is used to reset the image to true when after the image Url is change so we can check the next image
    setIsValidImage(true);
  }, [imageUrl]);

  if (!clickedLocation || !clickedLocation.longitude || !clickedLocation.latitude) {
    return <div>Double right click any location on the map to set a post!</div>;
  }

  const handleSubmit = () => {
    console.log("submitted")
  }
  

  return (
    <div className="flex max-w-md flex-col gap-4 bg-white p-4 rounded-lg dark:bg-gray-800 dark:text-white h-screen">
      {/* Longitude */}
      <div>
        <Label htmlFor="longitude" value="Longitude"/>
        <TextInput id="longitude" type="text" sizing="sm" value={clickedLocation.longitude} color="success" readOnly />
      </div>

      {/* Latitude */}
      <div>
        <Label htmlFor="latitude" value="Latitude" />
        <TextInput id="latitude" type="text" sizing="sm" value={clickedLocation.latitude} color="success" readOnly />
      </div>

      {/* Location Name */}
      <div>
        <Label htmlFor="location-name" value="Location Name" />
        <TextInput id="location-name" type="text" sizing="sm" placeholder="New York City" value={locationName} onChange={(e) => setLocationName(e.target.value)}/>
      </div>

      {/* Caption */}
      <div>
        <Label htmlFor="caption" value="Caption" />
        <TextInput id="caption" type="text" sizing="lg" placeholder="A lovely trip to the city" value={caption} onChange={(e) => setCaption(e.target.value)} />
      </div>

      {/* Image input area to displaya*/}
      <div
        className="border-2 border-dashed border-gray-300 p-4 text-center rounded-lg cursor-pointer"
      >
        <Label htmlFor="image-upload" value="Put an Image Url" />
        <TextInput id="image-Url-Input" onChange={(e) => setImageFile(e.target.value)} className="mt-2" />
        <p className="text-gray-500 text-sm mt-2">Add an image here!.</p>
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
