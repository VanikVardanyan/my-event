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
import axios from 'axios'

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
  try {
    const resp = await axios.get(`/api/requests-me?userId=${userId}`)
    return resp.data
  } catch (err) {
    console.error(err)
    return []
  }
}
