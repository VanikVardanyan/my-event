import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// const isDev = process.env.NODE_ENV === 'development'
const isDev = false

const firebaseConfig = {
  apiKey: isDev ? process.env.NEXT_PUBLIC_FIREBASE_API_KEY_DEV : process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: isDev ? process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_DEV : process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: isDev ? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID_DEV : process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: isDev
    ? process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_DEV
    : process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: isDev
    ? process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_DEV
    : process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: isDev ? process.env.NEXT_PUBLIC_FIREBASE_APP_ID_DEV : process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: isDev ? '' : process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Инициализация Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const provider = new GoogleAuthProvider()

// Initialize Storage
const storage = getStorage(app)

export { auth, db, storage, provider }
