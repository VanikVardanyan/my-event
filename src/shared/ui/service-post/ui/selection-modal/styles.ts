import { tss } from 'tss-react/mui'

export default tss.withName('SelectionModal').create({
  root: {},
  eventWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
})
