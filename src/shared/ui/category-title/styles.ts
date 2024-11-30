import { tss } from 'tss-react/mui'
import { FontH3 } from '@/shared/consts/fontStyles'
import { PinkBrownBase } from '@/shared/consts/colors'

export default tss.withName('CategoryTitle').create({
  titleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    marginBottom: 26,
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
})
