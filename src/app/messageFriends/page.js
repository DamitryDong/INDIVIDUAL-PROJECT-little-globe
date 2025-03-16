'use client'

import React, { useEffect, useState } from "react"
import { getAllUser } from "@/api/userApi"
import { Dropdown, Avatar } from "flowbite-react"
import { useTheme } from "@/utils/context/ThemeContext"

export default function FriendListPage() {
    const [users, setUsers] = useState([]) // Added default value as an empty array

    const {darkTheme} = useTheme()

    useEffect(() => {
        getAllUser().then((data) => {
            setUsers(data)
            console.log(data)
        })
    }, [])

    return (
        <div className={`${darkTheme ? "!bg-slate-800" : "!bg-white "} pt-[10%] h-screen`}>
            {users ? (
                users.map((individual) => (
                    <div key={individual.firebaseKey}>
                            <Dropdown
                            label={<Avatar alt="User settings" img={individual.photoURL || "/defaultProfile.jpeg"} rounded />}
                            arrowIcon={false}
                            inline
                            >
                                <Dropdown.Header>
                                    <span className="block text-sm">{individual.username}</span>
                                </Dropdown.Header>
                                <Dropdown.Item>Dashboard</Dropdown.Item>
                            </Dropdown>
                    </div>
                ))
            ) : (
                "hi"
            )}
        </div>
    )
}
