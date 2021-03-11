// import something here

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app"
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// Add the Firebase products that you want to use
import "firebase/auth"
import "firebase/firestore"



const firebaseConfig = {
  apiKey: "AIzaSyDDtCMxk222OcOWKSjGj2qH2M0ZR27iYvM",
  authDomain: "qworpus.firebaseapp.com",
  projectId: "qworpus",
  storageBucket: "qworpus.appspot.com",
  messagingSenderId: "691149350184",
  appId: "1:691149350184:web:b53c0f540794e353f65c1d"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

let db = firebase.firestore()

export default db
