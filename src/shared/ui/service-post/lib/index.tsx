import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db } from '@/shared/lib/firebaseConfig'

export const toggleFavorite = async (userId: string, postId: string) => {
  const userFavoritesRef = doc(db, 'favorites', userId)

  try {
    const userFavoritesSnap = await getDoc(userFavoritesRef)
    if (userFavoritesSnap.exists()) {
      const userFavorites = userFavoritesSnap.data().posts || []
      if (userFavorites.includes(postId)) {
        await updateDoc(userFavoritesRef, {
          posts: arrayRemove(postId),
        })
      } else {
        await updateDoc(userFavoritesRef, {
          posts: arrayUnion(postId),
        })
      }
    } else {
      await setDoc(userFavoritesRef, {
        posts: [postId],
      })
    }
  } catch (error) {
    console.error('Error toggling favorite: ', error)
  }
}
