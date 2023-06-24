// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { Firestore,getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAkUKqdo8sq5FjzBEDJxuvp78qMTEvKfUg",
    authDomain: "pumper-gb.firebaseapp.com",
    databaseURL: "https://pumper-gb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pumper-gb",
    storageBucket: "pumper-gb.appspot.com",
    messagingSenderId: "713594391786",
    appId: "1:713594391786:web:1ca8e524b9496db0fe1b93",
    measurementId: "G-2V5TY7B3QY"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
