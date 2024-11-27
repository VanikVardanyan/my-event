'use client'

import { useTranslations } from 'next-intl'
import useStyles from './styles'
import { Card } from './ui/Card'
import { serviceListMock } from '@/shared/utils/main-helper'

const CategoriesPage: React.FC = () => {
  const { classes } = useStyles()
  const t = useTranslations()

  return (
    <div className={classes.root}>
      <div className={classes.titleWrapper}>
        <div className={classes.titleBorder} />
        <h3 className={classes.title}>Ծառայություններ</h3>
      </div>
      <div className={classes.categoriesWrapper}>
        {serviceListMock.map((category) => (
          <Card key={category.link} {...category} />
        ))}
      </div>
    </div>
  )
}

export default CategoriesPage
