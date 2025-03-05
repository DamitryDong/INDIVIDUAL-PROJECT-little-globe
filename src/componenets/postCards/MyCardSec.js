'use client';

/* eslint-disable react/jsx-key */

import MyImageCards from "./MyImageCards";

export default function CardSection({ postObj }) {
  return (
    <div>
      {postObj ? (
        postObj.map((post) =>
          post.firebaseKey ? (
            <MyImageCards key={post.firebaseKey} cardobj={post} />
          ) : null
        )
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  );
}
