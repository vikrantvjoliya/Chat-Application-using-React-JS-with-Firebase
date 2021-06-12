import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyByM2ekO3goHg-rB2kCPj5etTpSmWqW1iY",
  authDomain: "klumedia.firebaseapp.com",
  projectId: "klumedia",
  storageBucket: "klumedia.appspot.com",
  messagingSenderId: "1025542311410",
  appId: "1:1025542311410:web:99272ba118024c1640ef6b",
  measurementId: "G-SXL1EF5DHP"
};

  
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage()

export { db, auth, provider, storage };
