import { firebaseConfig } from "@/utils/client";

const endpoint = firebaseConfig.databaseURL;

const getMessageByJoinKey = (Key) => new Promise((resolve,reject) => {
    fetch(`${endpoint}/messageRoom/${Key}.json`, {
        method: "GET", 
        headers: {
            "Content-Type": "application/json",
          },
    })
    .then((response) => response.json())
    .then((data) => {
      resolve(data ? Object.values(data) : [0]); // Return just the first one (since there will only be one...)
    })
    .catch(reject);
})

export { getMessageByJoinKey }