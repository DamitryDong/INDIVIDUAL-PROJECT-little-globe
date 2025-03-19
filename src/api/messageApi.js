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
        fetch(`${endpoint}/messageRoom.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            resolve(data);
        })
            .catch(reject);
    });

    const updateMessages = (roomName, newMessage) =>  //note 2 value
        new Promise((resolve, reject) => {
            const messageId = `msg_${Date.now()}`;  // Create a unique ID for the message, we can use this to date and also give the message a unique id to call
    
            fetch(`${endpoint}/messageRoom/${roomName}/messages/${messageId}`, { //the path is as simple as this, we use 2 values here.
                method: 'PATCH', //could also use a post since we're making a complete new message
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMessage),
            }) 
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch(reject);
        });
    


export { getMessageByJoinKey, createMessageBox, updateMessages }