import { tss } from 'tss-react/mui'

export default tss.withName('Profile').create({
  root: {
    maxWidth: 935,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 44,
  },
})
