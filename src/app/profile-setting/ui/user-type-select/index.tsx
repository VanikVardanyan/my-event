import React from 'react'
import { IUserTypeSelection } from './types'
import { UserType } from '@/shared/types/user.types'
import useStyles from './styles'
import cn from 'classnames'

interface ICard {
  onSelectUserType: (type: UserType) => () => void
  currentUserType: UserType | ''
  title: string
  description: string
  type: UserType
}

const userTypeData = {
  [UserType.PROVIDER]: {
    title: 'Поставщик услуг',
    description: 'Предлагаю услуги для мероприятий',
  },
  [UserType.CLIENT]: {
    title: 'Клиент',
    description: 'Ищу услуги и организовываю мероприятия',
  },
}

const Card = (props: ICard) => {
  const { classes } = useStyles()
  const { onSelectUserType, currentUserType, title, description, type } = props

  return (
    <div
      className={cn(classes.card, {
        [classes.active]: currentUserType === type,
      })}
      onClick={onSelectUserType(type)}
    >
      <div className={classes.title}>{title}</div>
      <p className={classes.description}>{description}</p>
    </div>
  )
}

const UserTypeSelection = (props: IUserTypeSelection) => {
  const { onSelectUserType, currentUserType } = props
  const { classes } = useStyles()

  return (
    <div className={classes.container}>
      <div className={classes.cardContainer}>
        <Card
          currentUserType={currentUserType}
          description={userTypeData[UserType.PROVIDER].description}
          title={userTypeData[UserType.PROVIDER].title}
          onSelectUserType={onSelectUserType}
          type={UserType.PROVIDER}
        />
        <Card
          currentUserType={currentUserType}
          description={userTypeData[UserType.CLIENT].description}
          title={userTypeData[UserType.CLIENT].title}
          onSelectUserType={onSelectUserType}
          type={UserType.CLIENT}
        />
      </div>
    </div>
  )
}

export default UserTypeSelection
