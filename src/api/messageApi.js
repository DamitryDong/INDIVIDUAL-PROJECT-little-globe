import { firebaseConfig } from "@/utils/client";

const endpoint = firebaseConfig.databaseURL;

const getMessageByJoinKey = (roomName) =>
    new Promise((resolve, reject) => {
      fetch(`${endpoint}/messageRoom.json?orderBy="roomName"&equalTo="${roomName}"`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          resolve(data ? Object.values(data) : []); 
        })
        .catch(reject);
    });

    const createMessageBox = (payload) =>
        new Promise((resolve, reject) => {
            // IF U USE PUT you can change the actual spot where the firebasekey is located at!!!
            fetch(`${endpoint}/messageRoom/${payload.roomName}.json`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    roomName: payload.roomName,  // We still use roomName inside the object
                    messages: payload.messages || {} 
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("Room created:", data);
                resolve(data);
            })
            .catch(reject);
        });
    

        const updateMessages = (roomName, payload) => {
            return new Promise((resolve, reject) => {
                fetch(`${endpoint}/messageRoom/${roomName}/messages.json`, {
                    method: 'POST',  // Use POST to add a new message with an auto-generated key
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                })
                .then((response) => response.json())
                .then((data) => resolve(data))
                .catch(reject);
            });
        };
    


export { getMessageByJoinKey, createMessageBox, updateMessages }