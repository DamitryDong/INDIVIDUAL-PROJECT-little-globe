'use client';

/* eslint-disable react/jsx-key */

import ImageCards from "./ImageCards";

export default function CardSection({ postObj }) {
  return (
    <div>
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
  );
}
