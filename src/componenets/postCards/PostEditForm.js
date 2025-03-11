
"use client";

import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { getSinglePost, updatePost } from "@/api/postApi";
import { ToastContainer, toast } from "react-toastify";

export default function ModalForUpdatePost({postObj}) {
  const [openModal, setOpenModal] = useState(false);
  const [location, setLocation] = useState('');
  const [caption, setCaption] = useState('');

  function onCloseModal() {
    setOpenModal(false);
  }

  useEffect(() => {
        getSinglePost(postObj.firebaseKey).then((data) => {
            setCaption(data.caption)
            setLocation(data.locationName)
        })
  },[])

  const handleSubmit = () => {
    const payload = {
        firebaseKey: postObj.firebaseKey,
        caption: caption,
        locationName: location,
    }
    updatePost(payload).then(() => {
        toast.success('updated Post!');
        setOpenModal(false)
    })
  }

  return (
    <>
    <ToastContainer/> 
      <Button onClick={() => setOpenModal(true)} size="sm" gradientDuoTone="cyanToBlue">Edit</Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Post</h3>

            <div>
              <div className="mb-2 block">
                <Label value="Location" />
              </div>
              <TextInput
                id="Location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label value="Caption" />
              </div>
              <TextInput
                id="Caption"
                value={caption}
                onChange={(event) => setCaption(event.target.value)}
                required
              />
            </div>

            <Button color="warning" onClick={handleSubmit}>Update</Button>

          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
