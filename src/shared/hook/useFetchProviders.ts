'use client'

import { useState, useEffect } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebaseConfig'

export const useFetchProviders = (profession: string) => {
  const [usersList, setUsersList] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const usersRef = collection(db, 'profiles')
        const q = query(
          usersRef,
          where('role', '==', 'provider'),
          where('profession', 'array-contains', profession),
          where('isApprovedUser', '==', true)
        )
        const querySnapshot = await getDocs(q)
        const users: any[] = []

        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() })
        })

        setUsersList(users)
      } catch (err) {
        setError('Error fetching providers')
      } finally {
        setLoading(false)
      }
    }

    fetchProviders()
  }, [profession])

  return { usersList, loading, error }
}
