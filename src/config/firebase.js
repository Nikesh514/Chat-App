
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { setDoc, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDHmdku7mI_O5vFZq4K6_v_9D7dSiTFO-o",
  authDomain: "chat-app-gs-e3cf4.firebaseapp.com",
  projectId: "chat-app-gs-e3cf4",
  storageBucket: "chat-app-gs-e3cf4.firebasestorage.app",
  messagingSenderId: "191293464256",
  appId: "1:191293464256:web:c71c0d1c52343028215725"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (username, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "users", user.uid),{
            id: user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar: "",
            bio: "Hey, I am using Chat App",
            lastSeen: Date.now(),
        })
        await setDoc(doc(db, "chats", user.uid), {
            chatData: [],

        })
    }catch (error){
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const logout = async () => {
    try {
        await signOut(auth);
    }catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

export { signup, login, logout, auth, db }