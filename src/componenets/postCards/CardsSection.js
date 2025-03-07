'use client';

import { useEffect, useState } from "react";
/* eslint-disable react/jsx-key */

import ImageCards from "./ImageCards";

export default function CardSection({ postObj, user }) {
  const [yourPost, setYourPost] = useState([]);
  const [friendPost, setFriendPost] = useState([])
  const [popularPost, setPopularPost] = useState([])

  useEffect(() => {
    if (postObj && user.uid) {
      // Filter out the posts that belong to the current user
      const userPosts = postObj.filter(post => post.uid === user.uid);

      // Set the filtered posts to yourPost
      setYourPost(userPosts);
      setFriendPost(userPosts)
    }
  }, [postObj, user.uid]); // Dependency array should include postObj and user.uid

  return (
    <div className="flex gap-4 justify-center">
      {/* First scrollable section */}
      <div className="overflow-y-auto h-full w-[30%]">
        {postObj ? (
          friendPost.map((post) =>
            post.firebaseKey ? (
              <ImageCards key={post.firebaseKey} cardobj={post} />
            ) : null
          )
        ) : (
          <p>Loading posts...</p>
        )}
      </div>

      {/* Second scrollable section */}
      <div className="overflow-y-auto h-full w-[30%]">
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

      {/* Third scrollable section */}
      <div className="overflow-y-auto h-full w-[30%]">
        {yourPost ? (
          yourPost.map((post) =>
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
