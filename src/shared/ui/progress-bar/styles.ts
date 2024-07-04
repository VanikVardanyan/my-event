import { tss } from 'tss-react/mui'
import { BackgroundGrey, GreenBase, TextGreyBase, TextSlateGreyBase } from '@/shared/consts/colors'
import { FontBody1, FontBody1Accent } from '@/shared/consts/fontStyles'

export default tss.withName('ProgressBar').create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  description: {
    marginBottom: 8,
    display: 'flex',
    justifyContent: 'space-between',
  },
  current: {
    ...FontBody1Accent,
    color: GreenBase,
  },
  total: {
    ...FontBody1,
    color: TextSlateGreyBase,
  },
  progressBar: {
    width: '100%',
    height: 12,
    borderRadius: 10,
    backgroundColor: BackgroundGrey,
    display: 'flex',
    flexDirection: 'column',
  },
  fill: {
    height: '100%',
    backgroundColor: GreenBase,
    borderRadius: 10,
    transition: 'width 0.3s ease-in-out',
  },
  step: {
    ...FontBody1,
    color: TextGreyBase,
  },
})
