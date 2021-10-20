import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyB3-jX2evDMdTS4OCH3OhfRpDxeh5w9J0U",
  authDomain: "whatsapp2021-feb4d.firebaseapp.com",
  projectId: "whatsapp2021-feb4d",
  storageBucket: "whatsapp2021-feb4d.appspot.com",
  messagingSenderId: "349494327696",
  appId: "1:349494327696:web:201528155335d5ab0a5b15",
  measurementId: "G-1LW5WB3JMK",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export default db;
export { auth, provider };
