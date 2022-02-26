import * as firebase from "firebase/app";
import {collection, getFirestore, serverTimestamp} from "firebase/firestore"
import {getStorage} from "firebase/storage"
import {getAuth} from "firebase/auth"

const firebaseApp = firebase.initializeApp(
    {
        apiKey: "AIzaSyAsglJS27NYWcak2PyRw9NCWG4ZEb7eT5A",
        authDomain: "health-shorts.firebaseapp.com",
        projectId: "health-shorts",
        storageBucket: "health-shorts.appspot.com",
        messagingSenderId: "409905509096",
        appId: "1:409905509096:web:71614eac2bea4d1a128f5d"
    })
    export let auth = getAuth();// for login/signup
    let firestore = getFirestore();
  
  export let database = { //user details/ entry
        user: collection(firestore, "user"),
        post: collection(firestore,"post"),
        Comment: collection(firestore,"comment"),
        getCurrentTimeStamp: serverTimestamp()
  }
  export let storage = getStorage(firebaseApp)// storage to store files such as img/video
//   export default firebase;

