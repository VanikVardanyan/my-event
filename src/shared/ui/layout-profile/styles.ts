import { FontBody1, FontBody1Accent } from '@/shared/consts/fontStyles'
import { tss } from 'tss-react/mui'
import { GreyBase, PinkBrownBase, SlateGreyBase, TextGreyBase, TextSlateGreyBase, White } from '@/shared/consts/colors'

export default tss.withName('ProfileMenu').create({
  root: {
    zIndex: 1000,
    width: 260,
    background: White,
    borderRight: 'none',
    boxShadow: 'inset -10px 0px 10px rgba(128, 121, 121, 0.25)',
  },
  wrapper: {
    padding: '26px 16px',
  },
  profileInfo: {
    display: 'flex',
    gap: 7,
    alignItems: 'center',
    marginBottom: 46,
  },
  profileDescription: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  profileName: {
    ...FontBody1,
    maxWidth: 160,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  profileGmail: {
    ...FontBody1,
    color: TextSlateGreyBase,
    maxWidth: 160,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  avatar: {
    width: 56,
    height: 56,
    border: `1px solid ${PinkBrownBase}`,
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
    color: TextSlateGreyBase,
    padding: '9px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: 10,

    '& svg': {
      fill: TextSlateGreyBase,
    },

    '&:hover': {
      color: TextGreyBase,

      '& svg': {
        fill: TextGreyBase,
      },
    },
  },
  linkActive: {
    ...FontBody1Accent,
    color: TextGreyBase,

    '& svg': {
      fill: TextGreyBase,
    },
  },
})
