'use client'

import { useEffect, useState } from 'react'
import useStyles from './styles'
import { RequestCard } from '@/shared/ui/request-card'
import { IRequestTypes } from '../../../profile/ui/request-create-modal/types'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/shared/lib/firebaseConfig'

export const RequestList = () => {
  const { classes } = useStyles()
  const [loading, setLoading] = useState(true)

  const [requests, setRequests] = useState<(IRequestTypes[] & { responses: any[] }) | []>([])

  const fetchRequests = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'requests'))
      const requestsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

      const dataWithDoingServices = requestsData.filter((d: any) => d.services.some((s: any) => s.status === 'doing'))
      const result: any = dataWithDoingServices.map((d: any) => ({
        ...d,
        services: d.services.filter((s: any) => s.status === 'doing'),
      }))
      setRequests(result)
    } catch (error) {
      console.error('Ошибка при загрузке пользователей:', error)
    } finally {
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchRequests().finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingOverlay loading={loading} />

  return (
    <div className={classes.root}>
      <div className={classes.requestCards}>
        {requests.map((request: any) => (
          <RequestCard key={request.id} {...request} updateAll={fetchRequests} />
        ))}
      </div>
    </div>
  )
}
