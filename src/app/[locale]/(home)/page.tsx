'use client'
import useStyles, { Container } from '../styles'
import { Link } from '@/navigation'
import { Routes } from '@/shared/routes'
import { useTranslations } from 'next-intl'
import { UserType } from '@/shared/types/user.types'
import { useSelector } from 'react-redux'
import { getProfile } from '@/store/selectors'

import { PinkBrownBase } from '@/shared/consts/colors'
import { Button } from '@/shared/ui/button'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import { PlanItems, professionList } from './utils'
import { PlanComponent } from './ui/plan-cpmponent'
import { Categories } from './ui/categories'
import { Blog } from './ui/blog'

export default function Home() {
  const { classes } = useStyles()
  const { profile } = useSelector(getProfile)
  const t = useTranslations()

  return (
    <div>
      <div className={classes.root}>
        <div className={classes.content}>
          <p className={classes.description}>{t('organize_your_events_quickly')}</p>
          <h3 className={classes.title}>
            {t.rich('organize_your_events', {
              highlight: (chunks) => <span style={{ color: PinkBrownBase }}>{chunks}</span>,
            })}{' '}
          </h3>
          <div className={classes.headerActions}>
            {profile?.role !== UserType.PROVIDER && (
              <Button LinkComponent={Link} href={Routes.CreateEvent} endIcon={<KeyboardDoubleArrowRightIcon />}>
                {t('start')}
              </Button>
            )}
          </div>
        </div>
        <div className={classes.professionSmallList}>
          {professionList.map((item, index) => (
            <div key={item} className={classes.professionSmallListItem}>
              <div className={classes.professionSmallListItemText}>{item}</div>
              {index !== professionList.length - 1 && (
                <div className={classes.professionSmallListCircle}>
                  <div className={classes.professionSmallListCircleFill} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={classes.headerBottom} />
      </div>
      <div className={classes.howWorkWrapper}>
        <div className={classes.howWorkSubTitle}>{t('platform_tools')}</div>
        <h2 className={classes.howWorkTitle}>Ի՞նչ ենք մենք առաջարկում</h2>
        <div className={classes.howWorkDescription}>
          {t('full_event_planning')} <br />{' '}
          {t.rich('mission_statement', {
            highlight: (chunks) => <span className={classes.howWorkDescriptionBold}>{chunks}</span>,
          })}
        </div>
      </div>
      <Container>
        <div className={classes.planWrapper}>
          <PlanComponent {...PlanItems.plan} />
          <div className={classes.planWrapperBorder} />
          <PlanComponent {...PlanItems.event} />
        </div>

        <Categories />
      </Container>
      <Blog />
    </div>
  )
}
