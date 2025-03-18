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


export { getMessageByJoinKey, createMessageBox }