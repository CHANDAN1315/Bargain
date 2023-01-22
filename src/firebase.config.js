import {getApp, getApps, initializeApp} from 'firebase/app'
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"



const firebaseConfig = {
    apiKey: "AIzaSyC8RWaFZH8TyM0St6qGXwdeOflibGaWi3g",
    authDomain: "bargain-f5542.firebaseapp.com",
    databaseURL: "https://bargain-f5542-default-rtdb.firebaseio.com",
    projectId: "bargain-f5542",
    storageBucket: "bargain-f5542.appspot.com",
    messagingSenderId: "494644028338",
    appId: "1:494644028338:web:814049b1bbda277f587aab"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app)
const storage = getStorage(app)

export {app, firestore, storage}