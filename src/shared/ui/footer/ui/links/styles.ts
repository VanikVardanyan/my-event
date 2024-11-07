import { tss } from 'tss-react/mui'
import { Black, GreyBase } from '../../../../consts/colors'
import { FontBody1, FontBody2 } from '../../../../consts/fontStyles'

export default tss.withName('FooterLink').create({
  root: {},
  linksWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  link: {
    ...FontBody1,
    color: GreyBase,
  },
  title: {
    ...FontBody2,
    color: Black,
    marginBottom: 10,
  },
})
