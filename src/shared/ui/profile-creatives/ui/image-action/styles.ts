import { tss } from 'tss-react/mui'
import { SlateGreyLighten18, SlateGreyLighten34 } from '../../../../consts/colors'

export default tss.withName('ImageAction').create({
  root: {},
  menuIcon: {
    position: 'absolute',
    right: 5,
    top: 5,
    background: SlateGreyLighten34,

    '&: hover': {
      background: SlateGreyLighten18,
    },
  },
})
