import { firebaseConfig } from "@/utils/client";

const endpoint = firebaseConfig.databaseURL;

const getAllpost = () => 
    console.log(endpoint) ||
    new Promise((resolve, reject) => {
        fetch(`${endpoint}/posts.json`, {
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

const getPostByUid = (uid) =>
    new Promise((resolve, reject) => {
      fetch(`${endpoint}/posts.json?orderBy="uid"&equalTo="${uid}"`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          resolve(data ? Object.values(data) : []); // Return all posts instead of just the first one
        })
        .catch(reject);
    });
  
const createPost = (payload) =>
    new Promise((resolve, reject) => {
        fetch(`${endpoint}/posts.json`, {
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

const updatePost = (payload) => 
    new Promise ((resolve,reject) => {
        fetch(`${endpoint}/posts/${payload.firebaseKey}.json`, {
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
    
    

    const deletePost = (firebaseKey) =>
        new Promise((resolve, reject) => {
            fetch(`${endpoint}/posts/${firebaseKey}.json`, { 
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
              })
                .then((response) => {
                  if (response.ok) {
                    return response.status === 204 ? resolve({}) : response.json().then(resolve);
                  }
                  return reject(new Error(`Failed to delete Post: ${response.status}`));
                })
                .catch(reject);
            }); 
    

export { getAllpost, createPost, deletePost, updatePost, getPostByUid };