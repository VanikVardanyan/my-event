import { tss } from 'tss-react/mui'
import { FontBody2, FontH3 } from '@/shared/consts/fontStyles'
import { darkSlateGray, PinkBrownBase, SlateGreyDarken7 } from '@/shared/consts/colors'
import { BreakPoints } from '../../../shared/consts/common'

export default tss.withName('Categories').create({
  root: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 40,

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      padding: '56px 13px',
    },
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  titleBorder: {
    width: 90,
    height: 1,
    background: PinkBrownBase,
  },
  title: {
    ...FontH3,
    color: PinkBrownBase,
  },
  categoriesWrapper: {
    display: 'flex',
    gap: 24,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  description: {
    ...FontBody2,
    color: SlateGreyDarken7,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
})
