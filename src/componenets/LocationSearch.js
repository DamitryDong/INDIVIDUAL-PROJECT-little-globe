"use client";

import { Label, TextInput, FileInput } from "flowbite-react";
import { useState } from "react";
import uploadImageAndGetURL from "@/api/imagestorage";
import { createPost } from "@/api/postApi";
import { Button } from "flowbite-react";

export function LocationSearch({ clickedLocation }) {
  const [imageFile, setImageFile] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [caption, setCaption] = useState("");

  if (!clickedLocation || !clickedLocation.longitude || !clickedLocation.latitude) {
    return <div>Double right click any location on the map to set a post!</div>;
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setImageFile(file);
    }
  };


  // HANDLE SUBMIT SECTION 
  const handleSubmitPost = async (imageFile, postData) => {
    try {
      if (!imageFile) {
        console.error("No image selected");
        return;
      }
  
      // Step 1: Upload image and get URL, this will hopefully return a url that we can store in firebase to call back
      const imageUrl = await uploadImageAndGetURL(imageFile);
  
      // Step 2: Add image URL to the payload
      const payload = {
        ...postData,  // Spread existing post data
        imageUrl,  // Add image URL from Firebase Storage
      };
  
      // Step 3: Send the payload to Firebase Realtime Database
      const post = await createPost(payload);
      console.log("Post created successfully:", post);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleSubmit = () => {
    const postData = {
      locationName,
      caption,
      longitude: clickedLocation.longitude,
      latitude: clickedLocation.latitude,
    };
    handleSubmitPost(imageFile, postData);
  };
  

  return (
    <div className="flex max-w-md flex-col gap-4 bg-white p-4 rounded-lg shadow-md">
      {/* Longitude */}
      <div>
        <Label htmlFor="longitude" value="Longitude" className="dark:text-black" />
        <TextInput id="longitude" type="text" sizing="sm" value={clickedLocation.longitude} readOnly />
      </div>

      {/* Latitude */}
      <div>
        <Label htmlFor="latitude" value="Latitude" className="dark:text-black" />
        <TextInput id="latitude" type="text" sizing="md" value={clickedLocation.latitude} readOnly />
      </div>

      {/* Location Name */}
      <div>
        <Label htmlFor="location-name" value="Location Name" className="dark:text-black" />
        <TextInput id="location-name" type="text" sizing="lg" placeholder="New York City" value={locationName} onChange={(e) => setLocationName(e.target.value)}/>
      </div>

      {/* Caption */}
      <div>
        <Label htmlFor="caption" value="Caption" className="dark:text-black" />
        <TextInput id="caption" type="text" sizing="lg" placeholder="A lovely trip to the city" value={caption} onChange={(e) => setCaption(e.target.value)} />
      </div>

      {/* Drag and Drop Image Upload */}
      <div
        className="border-2 border-dashed border-gray-300 p-4 text-center rounded-lg cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Label htmlFor="image-upload" value="Upload Image" className="dark:text-black" />
        <FileInput id="image-upload" onChange={handleFileChange} className="mt-2" />
        <p className="text-gray-500 text-sm mt-2">Drag & drop an image here or click to select a file.</p>
      </div>

      {/* Image Preview */}
      {imageFile && (
        <div className="mt-4">
          <p className="text-sm font-medium">Preview:</p>
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Uploaded"
            className="mt-2 rounded-lg max-h-40 object-cover"
          />
        </div>
      )}

        {/* Submit Button got it from flowbite*/}
        <Button outline gradientDuoTone="greenToBlue" onClick={handleSubmit}>
          Green to Blue
        </Button>

    </div>
  );
}
