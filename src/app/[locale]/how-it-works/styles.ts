import { tss } from 'tss-react/mui'
import { BreakPoints } from '../../../shared/consts/common'
import { FontBody2, FontH3 } from '../../../shared/consts/fontStyles'
import { TextGreyBase } from '../../../shared/consts/colors'

export default tss.withName('HowItWorks').create({
  root: {},
  howWorkWrapper: {
    maxWidth: 1240,
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 50,
    flexDirection: 'column',

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
  },
  titleWrapper: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginBottom: 20,
    marginTop: 40,
  },
  subTitle: {
    ...FontBody2,
    color: TextGreyBase,
  },
  titleBorder: {
    width: 34,
    height: 3,
    background: TextGreyBase,
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto 5px',
  },
  categories: {
    ...FontH3,
    color: TextGreyBase,
  },
})
