import { tss } from 'tss-react/mui'

export default tss.withName('ProfileSetting').create({
  root: {
    maxWidth: 600,
    width: '100%',
    margin: 'auto',
    minHeight: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  stepSection: {
    width: '100%',
    display: 'flex',
    gap: 10,
  },
})
