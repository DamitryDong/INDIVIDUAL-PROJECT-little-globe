'use client';

/* eslint-disable react/jsx-key */

import ImageCards from "./ImageCards";

export default function CardSection({ postObj }) {

  return (
    <div className="flex gap-4 justify-center">
      {/* First scrollable section */}
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
    </div>
  );
}
