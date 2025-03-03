"use client";

import { Button, Checkbox, Label, TextInput, Avatar } from "flowbite-react";
import { useAuth } from "@/utils/context/authContext";
import { use, useEffect, useState } from "react";
import { getSingleUserByUid, createUser, updateUser } from "@/api/userApi";
import { ToastContainer, toast } from "react-toastify";

export default function ProfilePage() {
    const [userInfo, setUserInfo] = useState({ username: '', photoURL: '' }); // Initialize with default values, you can also leave it empty and set the value later what eva
    const [userImage, setUserImage] = useState(''); // had to do image seperately because we will be populating the image with Google info if the image don't exist on firebase
    const [alreadySetUp, setAlreadySetUp] = useState(false)
    const [refresh, doRefresh] = useState(true)

    const { user } = useAuth();

    useEffect(() => {
        if (user?.uid) {
            getSingleUserByUid(user.uid).then((fetchedData) => {
                if (fetchedData) {
                    setUserInfo(fetchedData);
                    setUserImage(fetchedData.photoURL); // Default to empty string if no photoURL exist in firebase
                    setAlreadySetUp(true)
                }
            });
        } else {
            setUserImage(user.photoURL); // Default to empty string if no photoURL (default to google image)
        }
    }, [user, refresh]);

    // this is use for submitting the payload easy enough for a brand new account setting up we do a post.
    const handleProfilSetup = (e) => {
        e.preventDefault()
        
        const payload = {
            photoURL:  userImage,
            uid: user.uid,
            username: userInfo.username,
        }
        createUser(payload)
            .then((data) => {
                const firebasePayload = {
                    firebaseKey: data.name,
                }
                updateUser(firebasePayload)
                .then(() => {

                    // this is the message shown on the update complete container we got from toast, npm install react-toast will get u this 
                    toast.success('Profile Setup Completed!');
                    doRefresh(!refresh)

                });
            })
    }

    // this is for a existing account, we do a patch with thisone 
    const handleProfileUpdate = (e) => {
        e.preventDefault()

        const payload = {
            photoURL:  userImage,
            uid: user.uid,
            username: userInfo.username,
            firebaseKey: userInfo.firebaseKey,
        }
        updateUser(payload)
        .then(() => 
            // this is the message shown on the update complete container we got from toast, npm install react-toast will get u this 
        toast.success('Profile Update Completed')
        );
    }

    return (
        <div className="flex flex-row justify-center pt-[4%] gap-[5%] h-screen dark:bg-gray-800 dark:text-white pt-[10%]">

            <ToastContainer/> 
            {/* this is the toast container where the message will pop up */}

            <div className="text-center mt-[1%]">
                <h3 className="mb-[10%]"><strong>Public Image</strong></h3>
                <Avatar img={alreadySetUp? userImage :user.photoURL} size="xl" rounded bordered />
            </div>
            <form className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label value="Display Name" />
                    </div>
                    <TextInput
                        name="displayName"
                        id="displayName"
                        type="text"
                        value={userInfo.username}
                        onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                        required
                        placeholder="John Smith"
                        shadow
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label value="Display Name" />
                    </div>
                    <TextInput
                        name="changeImage" // you have to use name for the e.target for some reason
                        id="changeImage"
                        type="url"
                        value={userImage}
                        onChange={(e) => setUserImage(e.target.value)} // Allow user to change image URL
                        required
                        placeholder="https//something.com"
                        shadow
                    />
                </div>
                <Button className="mt-[7%]" type="submit" onClick={alreadySetUp? handleProfileUpdate : handleProfilSetup}>Complete</Button>
            </form>
        </div>
    );
}
