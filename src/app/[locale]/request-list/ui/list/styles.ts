import { tss } from 'tss-react/mui'

export default tss.withName('RequestList').create({
  root: {},
  requestCards: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },
})
