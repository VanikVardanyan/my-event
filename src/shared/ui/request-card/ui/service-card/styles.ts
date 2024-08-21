import { tss } from 'tss-react/mui'
import { FontBody1, FontBody2 } from '@/shared/consts/fontStyles'
import { PinkBrownBase, PurpleBase } from '@/shared/consts/colors'

export default tss.withName('ServiceOne').create({
  serviceWrapper: {},
  service: {
    ...FontBody1,

    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    marginBottom: 5,
  },
  serviceTitle: {
    color: PurpleBase,
  },
  requestCardGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  servicesTitle: {
    ...FontBody2,
    marginBottom: 5,
  },
})
