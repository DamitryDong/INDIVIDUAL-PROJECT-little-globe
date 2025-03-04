'use client'

/* eslint-disable react/jsx-key */


import ImageCards from "./ImageCards"

export default function CardSection( {postObj} ) {

    return (
<div className="max-h-[300px] border ">
    {postObj.length > 0 ? (
        postObj.map((post) => (
            <ImageCards key={post.firebaseKey} cardobj={post} />
        ))
    ) : (
        <p>Loading posts...</p>
    )}
</div>
    )
}