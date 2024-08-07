import { tss } from 'tss-react/mui'
import { BreakPoints } from '../../../../consts/common'
import { FontBody1 } from '../../../../consts/fontStyles'

export default tss.withName('responseListModal').create({
  root: {},
  title: {
    '& span': {
      ...FontBody1,
      maxWidth: 150,
      overflow: 'hidden',
      textOverflow: 'ellipsis',

      [`@media (min-width: ${BreakPoints.EXTRA_SMALL})`]: {
        maxWidth: '100%',
      },
    },
  },
  btn: {
    width: 40,
    height: 40,
    color: 'red',
  },
})
