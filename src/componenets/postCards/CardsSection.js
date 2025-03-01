'use client'

import { useState, useEffect } from "react"
import ImageCards from "./ImageCards"
import { getAllpost } from "@/api/postApi"

export default function CardSection() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log('data fetched on cards')
        getAllpost().then((post) => {
            setPosts(post)
        })
    }, [])

    return (
<div className="max-h-[300px] border ">
        {posts.map((post) => (
            <ImageCards key={post.id} cardobj={post}/>
        ))}
</div>
    )
}