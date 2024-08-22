import { tss } from 'tss-react/mui'
import { FontBody1 } from '../../consts/fontStyles'
import { White } from '../../consts/colors'
import { BreakPoints } from '../../consts/common'

export default tss.withName('footer').create({
  root: {
    padding: '40px 12px',
    background: '#21262C',
    display: 'flex',
    flexDirection: 'column',
    gap: 40,
    marginTop: 40,

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      padding: '70px 24px',
    },
  },
  footerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    color: White,
    gap: 25,

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      flexDirection: 'row',
    },
  },
  linksWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 30,

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
    },
  },
  link: {
    ...FontBody1,
    color: White,
  },
  colorPeace: {
    color: '#2690ff',
  },
  hiddenFooter: {
    display: 'none',
  },
})
