import { tss } from 'tss-react/mui'
import { BreakPoints } from '../../consts/common'

export default tss.withName('Networks').create({
  root: {
    display: 'grid',
    gap: 10,
    gridTemplateColumns: '1fr 1fr',

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      gridTemplateColumns: '1fr 1fr 1fr',
    },
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
})
