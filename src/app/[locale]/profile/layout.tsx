'use client'

import { Container } from '../styles'

import { LayoutProfile } from '../../../shared/ui/layout-profile'
import useStyles from './styles'

const Layout = ({ children }: any) => {
  const { classes } = useStyles()

  return (
    <div className={classes.layout}>
      <LayoutProfile />
      <Container className={classes.container}>{children}</Container>
    </div>
  )
}

export default Layout
