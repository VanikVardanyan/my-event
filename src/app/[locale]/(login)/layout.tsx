'use client'

import useStyles from './styles'
import { Routes } from '@/shared/routes'
import { useTranslations } from 'next-intl'
import { Link } from '../../../navigation'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { classes } = useStyles()
  const t = useTranslations('Signin')

  return (
    <div className={classes.root}>
      <div className={classes.bgSection}>
        <div className={classes.bgContent}>
          <div className={classes.title}>“My Event”</div>
          <div className={classes.registerContent}>
            {t('no_account')}{' '}
            <Link href={Routes.Register} className={classes.linkRegister}>
              {t('register')}
            </Link>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
