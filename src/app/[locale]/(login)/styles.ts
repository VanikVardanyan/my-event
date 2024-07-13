import { tss } from 'tss-react/mui'
import { BreakPoints } from '@/shared/consts/common'
import { White } from '@/shared/consts/colors'
import { FontBody1, FontBody1Accent } from '@/shared/consts/fontStyles'

export default tss.withName('LoginPage').create({
  root: {
    width: '100%',
    height: 'calc(100vh - 62px)',
    display: 'flex',
  },
  bgSection: {
    flex: 1,
    backgroundImage: `url('/signin/background.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'right',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'none',

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      display: 'flex',
    },
  },
  bgContent: {
    borderRadius: 10,
    padding: '12px',
    backgroundColor: 'rgba(0, 0, 0, 0.69)',
    color: White,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  registerContent: {
    ...FontBody1,
    color: White,
    marginTop: 10,
  },
  linkRegister: {
    ...FontBody1Accent,
    textDecoration: 'underline',
  },
  title: {
    ...FontBody1Accent,
  },
})
