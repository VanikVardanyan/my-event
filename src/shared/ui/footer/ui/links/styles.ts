import { tss } from 'tss-react/mui'
import { TextSlateGreyLighten30, White } from '../../../../consts/colors'
import { FontBody1, FontBody2 } from '../../../../consts/fontStyles'

export default tss.withName('FooterLink').create({
  root: {},
  linksWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  link: {
    ...FontBody1,
    color: White,
  },
  title: {
    ...FontBody2,
    color: White,
  },
})
