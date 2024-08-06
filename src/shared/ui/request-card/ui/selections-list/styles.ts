import { tss } from 'tss-react/mui'

export default tss.withName('responseListModal').create({
  root: {},
  title: {
    '& span': {
      maxWidth: 150,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  btn: {
    width: 40,
    height: 40,
    color: 'red',
  },
})
