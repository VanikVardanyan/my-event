'use client'

import { WorkCard } from '@/shared/ui/home-work-card'
import { workSteps } from '@/shared/utils/main-helper'
import { Container } from '../styles'
import useStyles from './styles'
import { useTranslations } from 'next-intl'

const HowItWorks = () => {
  const { classes } = useStyles()
  const t = useTranslations()

  return (
    <Container>
      <div className={classes.titleWrapper}>
        <div className={classes.titleBorder} />
        <h2 className={classes.categories}>{t('how_it_works')}</h2>
      </div>
      <div className={classes.howWorkWrapper}>
        {workSteps.map((step, index) => (
          <WorkCard key={index} {...step} />
        ))}
      </div>
    </Container>
  )
}

export default HowItWorks
