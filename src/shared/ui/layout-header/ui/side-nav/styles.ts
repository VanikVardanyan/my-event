import { FontBody1Accent } from '@/shared/consts/fontStyles'
import { tss } from 'tss-react/mui'
import { White } from '@/shared/consts/colors'

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
    ...FontBody1Accent,
    color: White,
    padding: '14px 14px',

    '&:hover': {
      background: '#1c3c21',
    },
  },
  linkActive: {
    background: '#1c3c21',
  },
})
