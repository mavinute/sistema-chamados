import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDXF4e6yOSJBRNvOSChi0UTvqIHCtA-0Zo",
  authDomain: "ava-estudos.firebaseapp.com",
  projectId: "ava-estudos",
  storageBucket: "ava-estudos.appspot.com",
  messagingSenderId: "670565257026",
  appId: "1:670565257026:web:cce6e938259414e2c442db"
};

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage }