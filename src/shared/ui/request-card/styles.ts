import { GreyBase, TextGreyBase } from '../../consts/colors'
import { FontH3, FontBody1, FontBody1Accent } from './../../consts/fontStyles'
import { tss } from 'tss-react/mui'

export default tss.withName('RequestCard').create({
  root: {
    padding: 10,
    width: 'max-content',
    cursor: 'pointer',
    transition: '0.3s',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  title: {
    ...FontH3,
    marginBottom: 10,
  },
  label: {
    ...FontBody1Accent,
    color: GreyBase,
  },
  description: {
    ...FontBody1,
    color: TextGreyBase,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginBottom: 10,
  },
  action: {},
})
