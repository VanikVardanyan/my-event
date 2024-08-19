import { tss } from 'tss-react/mui'
import { BreakPoints } from '@/shared/consts/common'

export default tss.withName('RequestList').create({
  root: {},
  requestCards: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 15,

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
    },
  },
})
