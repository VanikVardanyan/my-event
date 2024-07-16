import { FontBody1, FontBody1Accent } from '@/shared/consts/fontStyles'
import { tss } from 'tss-react/mui'
import { GreyBase, PinkBrownBase, SlateGreyBase, TextSlateGreyBase, White } from '@/shared/consts/colors'

export default tss.withName('SideNav').create({
  root: {},
  logoSection: {
    height: 120,
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
      fill: PinkBrownBase,
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
  logo: {
    objectFit: 'cover',
  },
})
