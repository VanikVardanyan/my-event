import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  collection,
  getDocs,
  where,
} from 'firebase/firestore'
import { db } from '@/shared/lib/firebaseConfig'

export const getFavorites = async (userId: string) => {
  const userFavoritesRef = doc(db, 'favorites', userId)

  try {
    const userFavoritesSnap = await getDoc(userFavoritesRef)
    if (userFavoritesSnap.exists()) {
      return {
        instagram: userFavoritesSnap.data()?.instagram || [],
        direct: userFavoritesSnap.data()?.direct || [],
      }
    } else {
      return {
        instagram: [],
        direct: [],
      }
    }
  } catch (error) {
    console.error('Error getting favorites: ', error)
    return {
      instagram: [],
      direct: [],
    }
  }
}

export const fetchUserRequests = async (userId: string) => {
  const q = query(collection(db, 'requests'), where('userId', '==', userId))
  const querySnapshot = await getDocs(q)
  const userRequests = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  return userRequests
}
