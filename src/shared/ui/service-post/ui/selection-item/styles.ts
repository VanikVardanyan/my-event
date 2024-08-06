import { tss } from 'tss-react/mui'
import { FontBody1, FontBody1Accent, FontH4 } from '../../../../consts/fontStyles'
import { DarkBlueBase, PinkBrownBase } from '../../../../consts/colors'

export default tss.withName('SelectionItem').create({
  root: {},
  title: {
    ...FontBody1Accent,
    color: DarkBlueBase,
  },
  item: {
    ...FontBody1,
    color: PinkBrownBase,
    display: 'flex',
    gap: 5,
  },
  serviceWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  addBtn: {
    width: 20,
    height: 20,
    cursor: 'pointer',
    color: DarkBlueBase,
  },
})
