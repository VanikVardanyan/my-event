'use client'

import Image from 'next/image'
import { Container } from '../../../app/[locale]/styles'
import useStyles from './styles'
import { FooterLinks } from './ui/links'
import { Link, usePathname, useRouter } from '../../../navigation'
import cn from 'classnames'
import { Routes } from '../../routes'

const linksCompany = [
  { title: 'Գլխավոր', link: '/contact' },
  { title: 'Մեր մասին', link: '/about' },
  { title: 'Կատեգորիաներ', link: '/about' },
  { title: 'Պորտֆոլիո', link: '/terms' },
  { title: 'Հետադարձ կապ', link: '/privacy' },
  { title: 'ՀՏՀ', link: '/privacy' },
]

const planners = [
  { title: 'Հաճախորդի իրավունքներ', link: '/terms' },
  { title: 'Գաղտնիության քաղաքականությունր', link: '/privacy' },
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
            <Image src="/logo/png/logo.png" alt="logo" width={253} height={253} />
          </div>
          <div className={classes.linksWrapper}>
            <FooterLinks title="Ընկերության մասին" links={linksCompany} />
            <FooterLinks title="Օգտակար հղումներ" links={planners} />
          </div>
        </div>
        <div className={classes.paymentWrapper}>
          <div className={classes.payment} />
        </div>
      </div>
    </div>
  )
}
