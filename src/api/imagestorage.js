import { storage } from "@/utils/client";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const uploadImageAndGetURL = async (imageFile) => {
  return new Promise((resolve, reject) => {
    if (!imageFile) {
      reject("No image selected");
      return;
    }

    const storageRef = ref(storage, `images/${imageFile.name}`); // Create reference in Storage
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress tracking (optional)
        console.log(`Upload is ${((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0)}% done`);
      },
      (error) => {
        console.error("Upload failed:", error);
        reject(error);
      },
      async () => {
        // Get the download URL when upload completes
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File available at:", downloadURL);
        resolve(downloadURL);
      }
    );
  });
};

export default uploadImageAndGetURL