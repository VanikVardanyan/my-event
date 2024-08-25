'use client'

import Image from 'next/image'
import { Container } from '../../../app/[locale]/styles'
import useStyles from './styles'
import { FooterLinks } from './ui/links'
import { Link, usePathname, useRouter } from '../../../navigation'
import cn from 'classnames'
import { Routes } from '../../routes'

const linksCompany = [
  { title: 'About us', link: '/about' },
  // { title: 'Contact us', link: '/contact' },
  { title: 'Terms and conditions', link: '/terms' },
  { title: 'Privacy policy', link: '/privacy' },
]

const planners = [
  { title: 'How it works', link: 'how-it-works' },
  { title: 'Pricing (soon)', link: 'pricing', isDisabled: true },
]
const support = [
  { title: 'Contact us', link: 'mailto:vanikvardanyandev@gmail.com' },
  { title: 'Login', link: Routes.Signin },
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
            <FooterLinks title="Company" links={linksCompany} />
            <FooterLinks title="Event Planners" links={planners} />
            <FooterLinks title="Support" links={support} />
          </div>
          <div></div>
        </div>
        <div className={classes.footerTop}>
          <div>
            © EvnEasy 2024 <span className={classes.colorPeace}>❤ Peace, Love & EvnEasy ® </span>{' '}
          </div>
          {/* <div>
            <Link href="/terms" className={classes.link}>
              Terms of Service
            </Link>{' '}
            |{' '}
            <Link href="/privacy" className={classes.link}>
              Privacy Policy
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  )
}
