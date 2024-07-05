import { tss } from 'tss-react'

export default tss.withName('ShowMan').create({
  root: {
    margin: 'auto',
  },
  servicesListWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },
})
