import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import configFile from "../config.json"

const firebaseConfig = {
    apiKey: "AIzaSyCnMSiW6U2Zx1aPoLAiqDIfMLsFtLYNb_s",
    authDomain: "boxinventory-755a4.firebaseapp.com",
    projectId: "boxinventory-755a4",
    storageBucket: "boxinventory-755a4.appspot.com",
    messagingSenderId: "640569408899",
    appId: "1:640569408899:web:ae95150d410a3aaeb80ab6"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };