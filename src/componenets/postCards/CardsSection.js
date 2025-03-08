'use client';

import { useEffect, useState } from "react";
/* eslint-disable react/jsx-key */

import ImageCards from "./ImageCards";
import { Badge } from "flowbite-react";

export default function CardSection({ postObj, user }) {
  const [yourPost, setYourPost] = useState([]);

  useEffect(() => {
    if (postObj && user.uid) {
      // Filter out the posts that belong to the current user
      const userPosts = postObj.filter(post => post.uid === user.uid);

      // Set the filtered posts to yourPost
      setYourPost(userPosts);
    }
  }, [postObj, user.uid]); // Dependency array should include postObj and user.uid

  return (
    <div className="flex gap-4 justify-center">
      {/* First scrollable section */}
      <div className="overflow-y-auto h-full w-[100%]">
        {postObj ? (
          postObj.map((post) =>
            post.firebaseKey ? (
              <ImageCards key={post.firebaseKey} cardobj={post} />
            ) : null
          )
        ) : (
          <p>Loading posts...</p>
        )}
      </div>

      <div className="w-[30%] fixed left-10 flex flex-row">
      <Badge color="gray" size="sm" >My Post</Badge>
      <Badge color="gray" size="sm">All Post</Badge>
      </div>

      {/* Second scrollable section */}
      <div className="overflow-y-auto h-full w-[100%]">
        {postObj ? (
          yourPost.map((post) =>
            post.firebaseKey ? (
              <ImageCards key={post.firebaseKey} cardobj={post} />
            ) : null
          )
        ) : (
          <p>Loading posts...</p>
        )}
      </div>

      {/* Second scrollable section with reversed order just to make things more interezting */}
      <div className="overflow-y-auto h-full w-[100%]">
        {postObj ? (
          yourPost
            .slice() 
            .reverse() 
            .map((post) =>
              post.firebaseKey ? (
                <ImageCards key={post.firebaseKey} cardobj={post} />
              ) : null
            )
        ) : (
          <p>Loading posts...</p>
        )}
      </div>

    </div>
  );
}
