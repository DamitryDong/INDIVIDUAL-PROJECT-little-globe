'use client';

/* eslint-disable react/jsx-key */

import ImageCards from "./ImageCards";

export default function CardSection({ postObj }) {
  return (
    <div>
      {postObj.length > 0 ? (
        postObj.map((post) => (
          <ImageCards key={post.firebaseKey} cardobj={post} />
        ))
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  );
}
