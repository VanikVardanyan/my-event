import { tss } from 'tss-react/mui'

export default tss.withName('EventServicesList').create({
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
})
