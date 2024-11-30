'use client'

import { useTranslations } from 'next-intl'
import useStyles from './styles'
import { Card } from './ui/Card'
import { Routes } from '../../../shared/routes'

const CategoriesPage: React.FC = () => {
  const { classes } = useStyles()
  const t = useTranslations()

  const categoriesList = [
    {
      title: 'Ծառայություններ',
      image: '/professions/showman.png',
      link: Routes.Services,
    },
    {
      title: 'Ապրանքներ',
      image: '/professions/party.png',
      link: Routes.EquipmentRental,
    },
    {
      title: 'Արտիստներ և խմբեր',
      image: '/professions/musician.png',
      link: Routes.Musicians,
    },
    {
      title: 'Ռեստորաններ և Քաթերինգ',
      image: '/professions/restaurant.png',
      link: Routes.Restaurants,
    },
  ]

  return (
    <div className={classes.root}>
      <div className={classes.titleWrapper}>
        <div className={classes.titleBorder} />
        <h3 className={classes.title}>Բաժիններ</h3>
      </div>
      <div className={classes.categoriesWrapper}>
        {categoriesList.map((category) => (
          <Card key={category.title} {...category} />
        ))}
      </div>
    </div>
  )
}

export default CategoriesPage
