// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,deleteUser as deleteAuthUser } from "firebase/auth";
import { getDatabase, ref, onValue ,push,remove,update,set,get} from "firebase/database";
import { getStorage } from "firebase/storage";
import { uploadBytes } from "firebase/storage";
import { ref as storageRef} from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { orderByChild } from "firebase/database";
import { child } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfUa73CVHMDWUmkyXlZ_7Q3kUCd83lmN0",
  authDomain: "ricewizard-2c15b.firebaseapp.com",
  databaseURL: "https://ricewizard-2c15b-default-rtdb.firebaseio.com",
  projectId: "ricewizard-2c15b",
  storageBucket: "ricewizard-2c15b.appspot.com",
  messagingSenderId: "211449297406",
  appId: "1:211449297406:web:d629004a9be35f147a28af",
  measurementId: "G-CK7FDKZGS8"
};


// Initialize Firebase
// Initialize Firebase Authentication and get a reference to the service
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.deleteUser = deleteAuthUser;
export const adminUID='ds3APsueVdQmDKYHRzUufkq9IJI2';
export const storage = getStorage(app, "gs://ricewizard-2c15b.appspot.com");
export { getDatabase, ref,onValue,push,remove,update,set,get,orderByChild,child };
export {  getDownloadURL,storageRef, uploadBytes };

