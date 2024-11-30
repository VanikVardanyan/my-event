import { tss } from 'tss-react'

export default tss.withName('ShowMan').create({
  root: {
    margin: 'auto',
    width: '100%',
  },
  servicesListWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },
  bread: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 15,
  },
})
