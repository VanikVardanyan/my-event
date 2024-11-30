import { tss } from 'tss-react'

export default tss.withName('ShowMan').create({
  root: {
    margin: 'auto',
    width: '100%',
  },
  servicesListWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  bread: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 15,
  },
})
