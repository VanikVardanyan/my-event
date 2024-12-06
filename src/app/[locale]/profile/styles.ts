import { TextGreyLighten25 } from '@/shared/consts/colors'
import { tss } from 'tss-react/mui'
import { FontBody1 } from '../../../shared/consts/fontStyles'

export default tss.withName('Profile').create({
  root: {
    maxWidth: 1300,
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 44,
    boxShadow: '0px 1px 17.6px 0px rgba(141, 141, 141, 0.25)',
    padding: 32,
    marginTop: 48,
    borderRadius: 8,
  },
  container: {
    width: '100%',
    minHeight: 300,
  },
  layout: {
    display: 'flex',
  },
  profileAvatar: {
    display: 'flex',
    gap: 32,
    alignItems: 'center',
  },
  nameSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  greyText: {
    ...FontBody1,
    color: TextGreyLighten25,
  },
  profileInfoSection: {
    marginTop: 24,
  },
})
