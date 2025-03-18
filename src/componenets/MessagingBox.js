'use client'

import { useEffect, useState } from "react"
import { getMessageByJoinKey, createMessageBox } from "@/api/messageApi"

export default function MessagingBox ({ messageBoxName, refreshMessage, myuid }) {
    const [messageBox, setMessageBox] = useState(["empty"])

    useEffect(() => {
        if (messageBoxName && typeof messageBoxName === 'string' && messageBoxName.trim() !== "") {
            console.log(`this is the data inputted${messageBoxName}`);
    
            getMessageByJoinKey(messageBoxName) 
                .then((data) => {

                    if (!data || data === "Message does not exist" || Object.keys(data).length === 0) { //if no data return we make the data 
                        console.log("need to create messagebox");
                        const payload = {
                            roomName: messageBoxName,
                            messages: [
                                {
                                    message: "Start a conversation!",
                                    user: "Bot",
                                    dateMade: new Date().toISOString() // ISO format for consistency
                                },
                            ]
                        }
                        createMessageBox(payload).then(() => { //then we grab the data again and set it! again (since its loaded now)
                            console.log("created new chatroom!!")
                            getMessageByJoinKey(messageBoxName)
                            .then((data) => {
                                setMessageBox(data);
                            })
                        })
                    }

                    else {
                        console.log("dataSetted!!")
                        console.log(data)
                        setMessageBox(data); // we set the data if it already exist 
                    }

                })

        }

    }, [messageBoxName,refreshMessage,]);
    
    return (
        <div> 
        ChatRoom ID: {messageBox[0]?.roomName} 
        {
            messageBox[0]?.messages && messageBox[0].messages.length > 0 ? (

                messageBox[0].messages.map((message, index) => { //loop through the messages for display if the room exist. 
                    if (message.user === "Bot") {
                        return <div key={index}>{message.message} it will be 1$ per message, watch it I have your information, just kidding</div>
                    }
                    else if (message.user === myuid) {
                        return <div key={index}>Your message{message.message}</div>
                    }
                    else {
                        return <div key={index}> their message: {message.message}</div>
                    }
                })

            ) : (
                "Click a person and start a chat!"
            )
        }
    </div>
        
    )
}