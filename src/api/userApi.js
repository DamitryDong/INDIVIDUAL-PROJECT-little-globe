import { firebaseConfig } from "@/utils/client";

const endpoint = firebaseConfig.databaseURL;

const getAllUser = () => 
    console.log(endpoint) ||
    new Promise((resolve, reject) => {
        fetch(`${endpoint}/user.json`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => {            
            if (data) {
                resolve(Object.values(data));
            }  
            else {
                console.log('No data found');
                resolve([]);
            }
        })
        .catch(reject)
});

const getSingleUserByUid = (uid) =>
    new Promise((resolve, reject) => {
      fetch(`${endpoint}/user.json?orderBy="uid"&equalTo="${uid}"`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const users = Object.values(data);
          resolve(users.length > 0 ? users[0] : null); //this instead returns an array because the 0 position is just the first object and we return that object as an array.
        })
        .catch(reject);
    });
  

const createUser = (payload) =>
    new Promise((resolve, reject) => {
        fetch(`${endpoint}/user.json`, {
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

const updateUser = (payload) => 
    new Promise ((resolve,reject) => {
        fetch(`${endpoint}/user/${payload.firebaseKey}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }) 
        .then((response) => response.json())
        .then((data) => {resolve(data);})
        .catch(reject);
    })

export {createUser, getAllUser, updateUser, getSingleUserByUid}