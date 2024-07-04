import { FontBody1, FontBody1Accent } from '@/shared/consts/fontStyles'
import { tss } from 'tss-react/mui'
import { GreyBase, SlateGreyBase, TextSlateGreyBase, White } from '@/shared/consts/colors'

export default tss.withName('SideNav').create({
  root: {},
  logoSection: {
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  link: {
    ...FontBody1,
    color: GreyBase,
    padding: '9px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: 10,

    '& svg': {
      fill: GreyBase,
    },

    '&:hover': {
      color: TextSlateGreyBase,

      '& svg': {
        fill: TextSlateGreyBase,
      },
    },
  },
  linkActive: {
    ...FontBody1Accent,
    color: TextSlateGreyBase,

    '& svg': {
      fill: TextSlateGreyBase,
    },
  },
})