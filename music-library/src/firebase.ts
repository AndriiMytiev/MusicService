import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCye15hwHeTKtW5nHjKar_bFwEjAEBiKCU",
  authDomain: "musiclibrary-ae363.firebaseapp.com",
  projectId: "musiclibrary-ae363",
  storageBucket: "musiclibrary-ae363.appspot.com",
  messagingSenderId: "1012193336883",
  appId: "1:1012193336883:web:1778474a9eef06cf9f4d46",
  measurementId: "G-RKQ21S3PK1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

const audioTest = ref(storage, "/music/testAudio.mp3");

export const testUrl = getDownloadURL(audioTest)
  .then((url) => {
    return url;
  })
  .catch((error) => {
    console.error(error);
  });
