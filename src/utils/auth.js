import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { app } from "./client";

const auth = getAuth(app); // Get Auth instance
const provider = new GoogleAuthProvider(); // Create Google Auth Provider

const signIn = () => signInWithPopup(auth, provider);

const signOutUser = () => signOut(auth);

export { signIn, signOutUser };
