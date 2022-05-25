import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDSXuwApxLnAnQiwpp0akHXaNt_5DLeqt8",
    authDomain: "attendance-app-1e7ba.firebaseapp.com",
    projectId: "attendance-app-1e7ba",
    storageBucket: "attendance-app-1e7ba.appspot.com",
    messagingSenderId: "995387193006",
    appId: "1:995387193006:web:491c695c2b66c5233d9f3f"
  };

  const app = initializeApp(firebaseConfig);

  export {  app }