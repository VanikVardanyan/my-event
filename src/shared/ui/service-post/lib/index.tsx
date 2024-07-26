import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db } from '@/shared/lib/firebaseConfig'

interface IPostId {
  isInstagram?: boolean
  id: string
}

export const toggleFavorite = async (userId: string, postId: IPostId) => {
  const userFavoritesRef = doc(db, 'favorites', userId)

  const id = {
    isInstagram: postId.isInstagram,
    id: postId.id,
  }

  const section = postId.isInstagram ? 'instagram' : 'direct'

  try {
    const userFavoritesSnap = await getDoc(userFavoritesRef)
    if (userFavoritesSnap.exists()) {
      const userFavorites = userFavoritesSnap.data() || {
        instagram: [],
        direct: [],
      }

      if (userFavorites[section].includes(postId.id)) {
        await updateDoc(userFavoritesRef, {
          [section]: arrayRemove(postId.id),
        })
      } else {
        await updateDoc(userFavoritesRef, {
          [section]: arrayUnion(postId.id),
        })
      }
    } else {
      await setDoc(userFavoritesRef, {
        [section]: [postId.id],
      })
    }
  } catch (error) {
    console.error('Error toggling favorite: ', error)
  }
}
