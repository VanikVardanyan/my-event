import { tss } from 'tss-react/mui'
import { FontBody1, FontH4 } from '../../../../consts/fontStyles'
import { TextGreyBase, TextSlateGreyBase } from '../../../../consts/colors'

export default tss.withName('SelectionModal').create({
  root: {},
  eventWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  title: {
    ...FontH4,
    color: TextGreyBase,
    marginBottom: 10,
  },
  emptyBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  emptyBlockTitle: {
    ...FontBody1,
    color: TextSlateGreyBase,
  },
})
