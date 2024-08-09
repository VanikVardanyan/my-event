import { FontBody1, FontBody1Accent } from '@/shared/consts/fontStyles'
import { tss } from 'tss-react/mui'
import { GreyBase, PinkBrownBase, SlateGreyBase, TextSlateGreyBase, White } from '@/shared/consts/colors'

export default tss.withName('SideNav').create({
  root: {
    zIndex: 1050,
  },
  logoSection: {
    height: 60,
    display: 'flex',
    flex: '0 0 auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkWrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflowY: 'auto',
    flexDirection: 'column',
    padding: 5,
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
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
})
