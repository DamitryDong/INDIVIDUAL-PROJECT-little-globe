'use client'

import { useEffect, useState } from "react"
import { getMessageByJoinKey, createMessageBox, updateMessages } from "@/api/messageApi"

export default function MessagingBox ({ messageBoxName, refreshMessage, myuid }) {
    const [messageBox, setMessageBox] = useState(["empty"])
    const [messageInput, setMessageInput] = useState("")

    const handleChange = (e) => {
        setMessageInput(e.target.value)
    }

    const handleSubmit = (e) => { 
        e.preventDefault(); 
        const payload = {
            dateMade : Date.now(),
            message : messageInput,
            user : myuid,
        }
        updateMessages(messageBoxName , payload)
        setMessageInput('');  
    };

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
                                // const tempMessages = [];
                                // data.forEach((message) => {
                                //     tempMessages.push(message)
                                // })
                                // setMessageBox(tempMessages);
                            })
                        })
                    }

                    else {
                        console.log("dataSetted!!")
                        console.log(data)
                        setMessageBox(data); // we set the data if it already exist 

                        // console.log(data)
                        // const tempMessages = [];
                        // data.forEach((message) => {
                        //     tempMessages.push(message)
                        // })
                        // setMessageBox(data); // we set the data if it already exist 
                    }

                })

        }

    }, [messageBoxName,refreshMessage,]);
    
    return (
        <div> 
        ChatRoom ID: {messageBox[0]?.roomName} 
        {
            messageBox[0]?.messages && Object.values(messageBox[0].messages).length > 0 ? (
                Object.values(messageBox[0].messages).map((message, index) => { // Convert the object to an array using Object.values()
                if (message.user === "Bot") {
                    return <div className="bg-red-600" key={index}>{message.message} it will be 1$ per message, watch it I have your information, just kidding</div>
                } else if (message.user === myuid) {
                    return <div className="bg-amber-500" key={index}>Your message: {message.message}</div>
                } else {
                    return <div className="bg-violet-700" key={index}>Their message: {message.message}</div>
                }
                })
            ) : (
                "Click a person to start chatting"
            )
            }

                                {/* the handle submit and change, getting real conformtable with these!! could also use a event listener but make sure to manage render*/}
        <div className="absolute bottom-0 w-[80%]" onSubmit={handleSubmit}>     
            <form id="chatForm">
                <label className="sr-only">Your message</label>
                <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <textarea value={messageInput} onChange={handleChange} id="chat" rows="1" className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                        <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                            <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" fill="currentColor" viewBox="0 0 18 20">
                                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                            </svg>
                        </button>
                    </div>
            </form>
        </div>

    </div>
        
    )
}