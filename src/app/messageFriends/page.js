'use client'

import React, { useEffect, useState } from "react"
import { getAllUser } from "@/api/userApi"
import { Dropdown, Avatar } from "flowbite-react"
import { useTheme } from "@/utils/context/ThemeContext"
import { useAuth } from "@/utils/context/authContext"
import MessagingBox from "@/componenets/MessagingBox"

export default function FriendListPage() {
    const [allUsers, setAllUsers] = useState([]) 
    const [name1Name2, setName1Name2] = useState()

    const {user} = useAuth();

    const {darkTheme} = useTheme()

    useEffect(() => {
        getAllUser().then((data) => {
            let userNotMe = []
            data.forEach((ind) => {
                if(ind.uid !== user.uid) {
                    userNotMe.push(ind)
                }
            })
            setAllUsers(userNotMe)
        })
    }, [])

    const handleOpenMessageBox = (uid) => { // since the issue is that depending on the user, the roomname might change (order) we sort it like this.
        const sortedUids = [uid, user.uid].sort();
        setName1Name2(`${sortedUids[0]}_${sortedUids[1]}`); 
    }

    return (
        <div className={`${darkTheme ? "!bg-slate-800" : "!bg-white "} h-screen flex flex-row justify-center items-center mx-auto`}>
            <div className="w-[20%] flex flex-col gap-10 justify-center items-center mx-auto h-screen overflow-auto bg-blue-800">
                {allUsers ? (
                    allUsers.map((individual) => (
                        <div key={individual.firebaseKey}>
                                <Dropdown
                                label={<Avatar alt="User settings" img={individual.photoURL || "/defaultProfile.jpeg"} rounded />}
                                arrowIcon={false}
                                inline
                                >
                                    <Dropdown.Header>
                                        <span className="block text-sm">{individual.username}</span>
                                    </Dropdown.Header>
                                    <Dropdown.Item onClick={(e) => handleOpenMessageBox(individual.uid)}>Message</Dropdown.Item>
                                </Dropdown>
                        </div>
                    ))
                ) : (
                    "error loading users"
                )}
            </div>

            <div className="w-[80%] bg-green-400">
                <MessagingBox messageBoxName={name1Name2}/>
            </div>
        </div>
    )
}
