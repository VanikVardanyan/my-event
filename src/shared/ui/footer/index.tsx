'use client'

import Image from 'next/image'
import { Container } from '../../../app/[locale]/styles'
import useStyles from './styles'
import { FooterLinks } from './ui/links'
import { Link, usePathname, useRouter } from '../../../navigation'
import cn from 'classnames'
import { Routes } from '../../routes'

const linksMock = [
  { title: 'About us', link: '#' },
  { title: 'Contact us', link: '#' },
  { title: 'Terms and conditions', link: '#' },
  { title: 'Privacy policy', link: '#' },
]

export const Footer = () => {
  const { classes } = useStyles()
  const history = usePathname()

  const isHidden = history === Routes.Messages

  return (
    <div className={cn({ [classes.hiddenFooter]: isHidden })}>
      <div className={classes.root}>
        <div className={classes.footerTop}>
          <div>
            <Image src="/logo/png/logo-no-background.png" alt="logo" width={150} height={50} />
          </div>
          <div className={classes.linksWrapper}>
            <FooterLinks title="Company" links={linksMock} />
            <FooterLinks title="Company" links={linksMock} />
            <FooterLinks title="Company" links={linksMock} />
            <FooterLinks title="Company" links={linksMock} />
          </div>
          <div></div>
        </div>
        <div className={classes.footerTop}>
          <div>
            © EvnEasy 2024 <span className={classes.colorPeace}>❤ Peace, Love & EvnEasy ® </span>{' '}
          </div>
          <div>
            <Link href="#" className={classes.link}>
              Terms of Service
            </Link>{' '}
            |{' '}
            <Link href="#" className={classes.link}>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
