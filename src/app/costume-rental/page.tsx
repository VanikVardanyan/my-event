'use client'

import { ServicePost } from '@/shared/ui/service-post'
import useStyles from './styles'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../shared/lib/firebaseConfig'
import { Professions } from '../../shared/types/user.types'
import { IPostProps } from '../../shared/ui/service-post/types'
import { useTranslations } from 'next-intl'

const ShowMan = () => {
  const { classes } = useStyles()
  const t = useTranslations('Shared')

  const [providerUsers, setProviderUsers] = useState<any>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProviderUsers = async () => {
      try {
        const usersRef = collection(db, 'profiles')
        const q = query(
          usersRef,
          where('role', '==', 'provider'),
          where('profession', 'array-contains', Professions.CostumeRental)
        )
        const querySnapshot = await getDocs(q)

        const usersList: any = []
        querySnapshot.forEach((doc) => {
          usersList.push({ id: doc.id, ...doc.data() })
        })

        setProviderUsers(usersList)
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProviderUsers()
  }, [])

  return (
    <div className={classes.root}>
      <div className={classes.servicesListWrapper}>
        {providerUsers.map((service: any) => (
          <ServicePost key={service.id} {...service} />
        ))}
        {providerUsers.length === 0 && !loading && <div>{t('current_list_is_empty')}</div>}
      </div>
    </div>
  )
}

export default ShowMan
