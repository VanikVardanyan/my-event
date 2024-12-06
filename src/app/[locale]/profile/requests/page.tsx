'use client'

import { RequestCard } from './ui/request-card'
import useStyles from './styles'

const requestsListMock = [
  {
    id: '1',
    name: 'John Doe',
    title: 'ծննդյան երեկույթ',
    date: '2021-09-01',
    avatarUrl: '',
  },
  {
    id: '1',
    name: 'John Doe',
    title: 'ծննդյան երեկույթ',
    date: '2021-09-01',
    avatarUrl: '',
  },
]

export default function NotificationsPage() {
  const { classes } = useStyles()

  return (
    <div>
      <h4 className={classes.title}>Հարցումներ</h4>
      <div className={classes.notificationsWrapper}>
        {requestsListMock.map((item) => (
          <RequestCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}
