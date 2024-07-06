import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyC76vkVYktLxx3fXabIuiuzDkcZirb6rDQ',
  authDomain: 'my-event-5ec1f.firebaseapp.com',
  projectId: 'my-event-5ec1f',
  storageBucket: 'my-event-5ec1f.appspot.com',
  messagingSenderId: '846330526651',
  appId: '1:846330526651:web:71d005dc8632b58e46e29e',
  measurementId: 'G-4X1RKZ9JQJ',
}
// Инициализация Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const provider = new GoogleAuthProvider()

// Initialize Storage
const storage = getStorage(app)

export { auth, db, storage, provider }
