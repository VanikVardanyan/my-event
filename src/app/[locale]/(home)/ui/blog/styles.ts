import { tss } from 'tss-react'
import { BreakPoints } from '../../../../../shared/consts/common'

export default tss.withName('MainBlog').create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: 22,
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blog: {
    backgroundImage: 'url(/main/blog-bg.png)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: 200,

    [`@media (min-width: ${BreakPoints.EXTRA_SMALL})`]: {
      backgroundSize: 'cover',
      height: 400,
    },
  },
})
