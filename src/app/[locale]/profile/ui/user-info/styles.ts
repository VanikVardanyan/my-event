import { TextGreyBase } from '@/shared/consts/colors'
import { FontBody1 } from '@/shared/consts/fontStyles'
import { tss } from 'tss-react/mui'

export default tss.withName('UserInfo').create({
  root: {},
  avatarSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 10,
    width: '100%',
    textAlign: 'center',
    marginBottom: 12,
  },
  avatar: {
    borderRadius: '50%',
    objectFit: 'cover',
  },
  name: {
    ...FontBody1,
    color: TextGreyBase,
  },
  requestCards: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    gap: 15,
  },
})
