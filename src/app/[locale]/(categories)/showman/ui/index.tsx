'use client'

import { ServicePost } from '@/shared/ui/service-post'
import useStyles from './styles'
import { Professions } from '@/shared/types/user.types'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'
import { showmanData } from '@/shared/data/showman'
import { UserCardMini } from '@/shared/ui/user-card-mini'
import { useFetchProviders } from '@/shared/hook/useFetchProviders'
import { IPostProps } from '../../../../../shared/ui/service-post/types'
import { Routes } from '../../../../../shared/routes'
import { BreadcrumbsList } from '../../../../../shared/ui/breadcrumbs'
import { CategoryTitle } from '../../../../../shared/ui/category-title'

const mockServicePost10Item: IPostProps[] = [
  {
    avatar: '/avatar.jpg',
    name: 'test',
    images: [],
    description: 'test',
    profession: [Professions.Showman],
    id: '1',
    likeCount: 3,
  },
  {
    avatar: '/avatar.jpg',
    name: 'test',
    images: [],
    description: 'test',
    profession: [Professions.Showman],
    id: '2',
    likeCount: 3,
  },
  {
    avatar: '/avatar.jpg',
    name: 'test',
    images: [],
    description: 'test',
    profession: [Professions.Showman],
    id: '3',
    likeCount: 3,
  },
  {
    avatar: '/avatar.jpg',
    name: 'test',
    images: [],
    description: 'test',
    profession: [Professions.Showman],
    id: '4',
    likeCount: 3,
  },
  {
    avatar: '/avatar.jpg',
    name: 'test',
    images: [],
    description: 'test',
    profession: [Professions.Showman],
    id: '5',
    likeCount: 3,
  },
  {
    avatar: '/avatar.jpg',
    name: 'test',
    images: [],
    description: 'test',
    profession: [Professions.Showman],
    id: '6',
    likeCount: 3,
  },
  {
    avatar: '/avatar.jpg',
    name: 'test',
    images: [],
    description: 'test',
    profession: [Professions.Showman],
    id: '7',
    likeCount: 3,
  },
  {
    avatar: '/avatar.jpg',
    name: 'test',
    images: [],
    description: 'test',
    profession: [Professions.Showman],
    id: '8',
    likeCount: 3,
  },
]

const breads = [
  {
    label: 'Բաժիններ',
    href: Routes.Categories,
  },
  {
    label: 'Ծառայություններ',
    href: Routes.Services,
  },
]

export const ShowManRoot = () => {
  const { classes } = useStyles()
  const { loading, usersList, error } = useFetchProviders(Professions.Showman)

  if (loading) return <LoadingOverlay loading />

  return (
    <div>
      <CategoryTitle title={Professions.Showman} />
      <BreadcrumbsList className={classes.bread} currentLabel={Professions.Cake} breads={breads} />
      <div className={classes.root}>
        <div className={classes.servicesListWrapper}>
          {[...usersList, ...mockServicePost10Item].map((service: any) => (
            <ServicePost key={service.id} {...service} />
          ))}
          {showmanData.map((item) => {
            return <UserCardMini key={item.username} {...item} />
          })}
        </div>
      </div>
    </div>
  )
}

const rtt = []
