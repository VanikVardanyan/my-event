import { tss } from 'tss-react/mui'
import { PurpleLighten40, SlateGreyDarken18, SlateGreyLighten45, SlateGreyLighten46 } from '../../../../consts/colors'
import { FontBody1Accent } from '../../../../consts/fontStyles'

export default tss.withName('ImageAction').create({
  root: {},
  menuIcon: {
    background: SlateGreyLighten46,
  },
  menuWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  link: {
    ...FontBody1Accent,
    color: SlateGreyDarken18,
    padding: '8px 14px',
    background: 'inherit',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    gap: 5,

    '&:hover': {
      background: SlateGreyLighten45,
    },

    '&:active': {
      boxShadow: `0px 0px 0px 3px  ${PurpleLighten40}`,
    },
  },
})
