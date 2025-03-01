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
        <div>
            {posts.map((post) => {
                return (
                    <ImageCards key={post.id}/>
                )
            })}
        </div>
    )
}