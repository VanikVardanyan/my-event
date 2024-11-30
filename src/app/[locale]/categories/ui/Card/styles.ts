import { tss } from 'tss-react/mui'
import { FontBody1Accent, FontBody2, FontH3 } from '@/shared/consts/fontStyles'
import { PurpleLighten25 } from '@/shared/consts/colors'
import { BreakPoints } from '@/shared/consts/common'

export default tss.withName('CategoriesCard').create({
  root: {
    padding: '9px 9px 16px',
    background: PurpleLighten25,
    maxWidth: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 8,
    gap: 16,
    transition: 'transform 200ms ease',

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      maxWidth: 340,
    },

    '&: hover': {
      transform: 'scale(1.05)',
    },
  },
  title: {
    ...FontBody1Accent,
    alignSelf: 'flex-start',
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
