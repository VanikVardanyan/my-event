import { tss } from 'tss-react/mui'
import { FontBody1Accent } from '@/shared/consts/fontStyles'
import { TextGreyBase } from '@/shared/consts/colors'

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
  notFavorites: {
    ...FontBody1Accent,
    color: TextGreyBase,
    textAlign: 'center',
  },
})
