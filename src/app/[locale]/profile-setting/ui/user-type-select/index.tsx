import React from 'react'
import { IUserTypeSelection } from './types'
import { UserType } from '@/shared/types/user.types'
import useStyles from './styles'
import cn from 'classnames'
import { useTranslations } from 'next-intl'

interface ICard {
  onSelectUserType: (type: UserType) => () => void
  currentUserType: UserType | ''
  title: string
  description: string
  type: UserType
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
  const t = useTranslations()

  const { classes } = useStyles()

  const userTypeData = {
    [UserType.PROVIDER]: {
      title: t('provider_title'),
      description: t('provider_description'),
    },
    [UserType.CLIENT]: {
      title: t('client_title'),
      description: t('client_description'),
    },
  }

  return (
    <div className={classes.container}>
      <div className={classes.titleSection}>
        <div className={classes.typeTitle}>{t('user_type_select')}</div>
        <div className={classes.typeSubTitle}>{t('user_type_select_description')}</div>
      </div>
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
