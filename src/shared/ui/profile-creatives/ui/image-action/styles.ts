import { tss } from 'tss-react/mui'
import { SlateGreyLighten46 } from '../../../../consts/colors'

export default tss.withName('ImageAction').create({
  root: {},
  menuIcon: {
    position: 'absolute',
    right: 5,
    top: 5,
    background: SlateGreyLighten46,
  },
})
