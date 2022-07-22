import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCm7QujCaUM4ZLh7G_wu8oQFx0NMDLRIbY",
  authDomain: "pdf-storage-23d46.firebaseapp.com",
  projectId: "pdf-storage-23d46",
  storageBucket: "pdf-storage-23d46.appspot.com",
  messagingSenderId: "56015953440",
  appId: "1:56015953440:web:a5ce2fbc674f74e2afe645",
};
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
export { storage };
