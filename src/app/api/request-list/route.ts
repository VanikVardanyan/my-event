import { NextResponse } from 'next/server'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/shared/lib/firebaseConfig'

export const GET = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'requests'))
    const requestsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

    const dataWithDoingServices = requestsData.filter((d: any) => d.services.some((s: any) => s.status === 'doing'))
    const result: any = dataWithDoingServices.map((d: any) => ({
      ...d,
      services: d.services.filter((s: any) => s.status === 'doing'),
    }))

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    {
      return NextResponse.json({ error: 'Ошибка при загрузке данных' }, { status: 500 })
    }
  }
}
