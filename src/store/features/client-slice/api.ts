import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db } from '@/shared/lib/firebaseConfig'

export const getFavorites = async (userId: string) => {
  const userFavoritesRef = doc(db, 'favorites', userId)

  try {
    const userFavoritesSnap = await getDoc(userFavoritesRef)
    if (userFavoritesSnap.exists()) {
      return userFavoritesSnap.data()
    } else {
      return {
        instagram: [],
        direct: [],
      }
    }
  } catch (error) {
    console.error('Error getting favorites: ', error)
    return []
  }
}
