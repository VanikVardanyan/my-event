import { useEffect, useState } from 'react'
import useStyles from './styles'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/shared/lib/firebaseConfig'
import { RequestCard } from '@/shared/ui/request-card'
import { IRequestTypes } from '../../../profile/ui/request-create-modal/types'

export const RequestList = () => {
  const { classes } = useStyles()

  const [requests, setRequests] = useState<(IRequestTypes[] & { responses: any[] }) | []>([])

  useEffect(() => {
    const fetchRequests = async () => {
      const querySnapshot = await getDocs(collection(db, 'requests'))
      const requestsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setRequests(requestsData as any)
    }

    fetchRequests()
  }, [])

  return (
    <div className={classes.root}>
      <div className={classes.requestCards}>
        {requests.map((request: any) => (
          <RequestCard key={request.id} {...request} />
        ))}
      </div>
    </div>
  )
}
