// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey:"AIzaSyDoYNCBGLAf29Cvy1P7MM-4cKujxphtkdo",
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-cbf76.firebaseapp.com",
  projectId: "mern-estate-cbf76",
  storageBucket: "mern-estate-cbf76.appspot.com",
  messagingSenderId: "693607318846",
  appId: "1:693607318846:web:ac1a1c6718db4acd78986f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);