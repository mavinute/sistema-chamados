import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBmtIv87xuMvace40Tj8W4S03Onf9PGmqw",
  authDomain: "thenote-738be.firebaseapp.com",
  projectId: "thenote-738be",
  storageBucket: "thenote-738be.appspot.com",
  messagingSenderId: "368461232064",
  appId: "1:368461232064:web:85708f0c6262cb45077a25",
  measurementId: "G-ZDJFW8KLBM"
};

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage }