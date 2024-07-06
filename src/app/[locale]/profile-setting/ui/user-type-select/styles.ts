import { FontBody1Accent, FontBody2 } from '@/shared/consts/fontStyles'
import { tss } from 'tss-react/mui'
import { BackgroundWhite, PurpleLighten25, TextGreyBase, TextSlateGreyLighten8 } from '@/shared/consts/colors'
import { BreakPoints } from '../../../../../shared/consts/common'

export default tss.withName('UserTypesSelect').create({
  container: {
    textAlign: 'center',
    marginBottom: 20,
    padding: 10,
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 40,
    flexDirection: 'column',

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      flexDirection: 'row',
    },
  },
  card: {
    flex: 1,
    backgroundColor: BackgroundWhite,
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    border: `2px solid transparent`,

    '&:hover': {
      transform: 'scale(1.05)',
    },

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      width: '150px',
    },
  },
  image: {
    display: 'none',

    [`@media (min-width: 400px)`]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 24,
      width: '100%',
      maxWidth: 147,
      height: 92,
    },
  },
  title: {
    color: TextGreyBase,
    ...FontBody1Accent,
    marginBottom: 10,
  },
  description: {
    ...FontBody2,
    color: TextSlateGreyLighten8,
  },
  active: {
    border: `2px solid ${PurpleLighten25} !important`,
  },
})
