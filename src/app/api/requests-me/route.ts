import { NextResponse } from 'next/server'
import { query, collection, getDocs, where } from 'firebase/firestore'
import { db } from '@/shared/lib/firebaseConfig'

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'user id is not defined' }, { status: 400 })
  }

  try {
    const q = query(collection(db, 'requests'), where('userId', '==', userId))
    const querySnapshot = await getDocs(q)
    const userRequests = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

    return NextResponse.json(userRequests, { status: 200 })
  } catch (error) {
    {
      console.error('Ошибка при загрузке пользователей:', error)
      return NextResponse.json({ error: 'Ошибка при загрузке данных' }, { status: 500 })
    }
  }
}
