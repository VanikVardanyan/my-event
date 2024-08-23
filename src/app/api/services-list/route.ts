import { NextResponse } from 'next/server'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/shared/lib/firebaseConfig'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const profession = searchParams.get('profession')

  if (!profession) {
    return NextResponse.json({ error: 'Profession is required' }, { status: 400 })
  }

  try {
    const usersRef = collection(db, 'profiles')
    const q = query(
      usersRef,
      where('role', '==', 'provider'),
      where('profession', 'array-contains', profession),
      where('isApprovedUser', '==', true)
    )
    const querySnapshot = await getDocs(q)

    const usersList: any = []
    querySnapshot.forEach((doc) => {
      usersList.push({ id: doc.id, ...doc.data() })
    })

    return NextResponse.json(usersList, { status: 200 })
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error)
    return NextResponse.json({ error: 'Ошибка при загрузке пользователей' }, { status: 500 })
  }
}
