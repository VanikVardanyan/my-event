import { tss } from 'tss-react/mui'
import { FontBody1Accent, FontBody2, FontH3 } from '@/shared/consts/fontStyles'
import { Black, PurpleLighten25 } from '@/shared/consts/colors'

export default tss.withName('About').create({
  root: {
    padding: '9px 9px 16px',
    background: '#9747FF30',
    maxWidth: 300,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 8,
    gap: 16,
  },
  titleWrapper: {
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    ...FontBody1Accent,
    color: Black,
    marginTop: 7,
  },
  description: {
    ...FontBody2,
    fontSize: 16,
    color: '#4C4848',
  },
  image: {
    borderRadius: 8,
    width: '100%',
    minHeight: 370,
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
})
