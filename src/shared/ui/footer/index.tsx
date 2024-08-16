'use client'

import Image from 'next/image'
import { Container } from '../../../app/[locale]/styles'
import useStyles from './styles'

export const Footer = () => {
  const { classes } = useStyles()
  return (
    <Container>
      <div className={classes.root}>
        <div>
          <Image src="/logo/png/logo-no-background.png" alt="logo" width={250} height={100} />
        </div>
      </div>
    </Container>
  )
}
