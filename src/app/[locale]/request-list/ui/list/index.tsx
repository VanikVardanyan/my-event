import { useEffect, useState } from 'react'
import useStyles from './styles'
import { RequestCard } from '@/shared/ui/request-card'
import { IRequestTypes } from '../../../profile/ui/request-create-modal/types'
import { useRouter } from '@/navigation'
import { Routes } from '@/shared/routes'
import axios from 'axios'

export const RequestList = () => {
  const { classes } = useStyles()
  const router = useRouter()

  useEffect(() => {
    // router.push(Routes.Profile)
  }, [])

  const [requests, setRequests] = useState<(IRequestTypes[] & { responses: any[] }) | []>([])

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`/api/request-list`)
      const usersList = await response.data

      setRequests(usersList)
    } catch (error) {
      console.error('Ошибка при загрузке пользователей:', error)
    } finally {
      // setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

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
