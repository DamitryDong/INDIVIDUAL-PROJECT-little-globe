'use client'

import { useEffect, useState } from "react"
import { getMessageByJoinKey, createMessageBox } from "@/api/messageApi"

export default function MessagingBox (messageBoxName) {
    const [messageBox, setMessageBox] = useState([])

    useEffect(() => {
        console.log(messageBoxName);
    
        getMessageByJoinKey(messageBoxName) // change this to messageBoxNAme TODO: it work :)))
            .then((data) => {
                console.log(data)
                setMessageBox(data);
    
                // Check for non-existent message here. we will create a new message box if the messagebox doent exist :) TODO:
                if (!data || data === "Message does not exist" || Object.keys(data).length === 0) {
                    console.log("need to create messagebox");
                    const payload = {
                        RoomName: messageBoxName ,
                    }
                    createMessageBox(payload).then((data) => {
                        console.log(data)
                    })
                    
                }
            })

    }, [messageBoxName]);
    
    return (
        <div> 
            {messageBox.RoomName}
        </div>
    )
}