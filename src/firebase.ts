import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyB0Dk-TKyLaK67CubgD5mluhocZqyMCBRQ",
    authDomain: "movie-fe9c5.firebaseapp.com",
    projectId: "movie-fe9c5",
    storageBucket: "movie-fe9c5.firebasestorage.app",
    messagingSenderId: "1048547305254",
    appId: "1:1048547305254:web:948f4b976a50153ca743e7",
    measurementId: "G-LRDKRHM8TK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);