import { tss } from 'tss-react/mui'

export default tss.withName('Networks').create({
  root: {
    display: 'grid',
    gap: 10,
    gridTemplateColumns: '1fr 1fr 1fr',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
})
