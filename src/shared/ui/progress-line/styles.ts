import { tss } from 'tss-react/mui'
import {
  BackgroundGrey,
  DarkBlueBase,
  GreenBase,
  PinkBrownBase,
  TextGreyBase,
  TextSlateGreyBase,
} from '@/shared/consts/colors'
import { FontBody1, FontBody1Accent } from '@/shared/consts/fontStyles'

export default tss.withName('ProgressBar').create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
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
    backgroundColor: DarkBlueBase,
    borderRadius: 10,
    transition: 'width 0.3s ease-in-out',
  },
  step: {
    ...FontBody1,
    color: TextGreyBase,
  },
})
