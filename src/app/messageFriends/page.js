'use client'

import React, { useEffect, useState } from "react"
import { getAllUser } from "@/api/userApi"

export default function FriendListPage() {
    const [users, setUsers] = useState([]) // Added default value as an empty array

    useEffect(() => {
        getAllUser().then((data) => {
            setUsers(data)
            console.log(data)
        })
    }, [])

    return (
        <div className="pt-[10%]">
            {users ? (
                users.map((individual) => (
                    <img key={individual.firebaseKey} src={individual.photoURL} alt="User" 
                    className="w-10 h-10 rounded-sm"
                    />
                ))
            ) : (
                "hi"
            )}
        </div>
    )
}
