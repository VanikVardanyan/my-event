import { TextGreyBase } from '@/shared/consts/colors'
import { FontBody1 } from '@/shared/consts/fontStyles'
import { tss } from 'tss-react/mui'

export default tss.withName('ProfileHeader').create({
  root: {
    width: '100%',
    display: 'flex',
    gap: 28,
  },
  avatarSection: {
    width: 181,
    objectFit: 'cover',
  },
  avatar: {
    borderRadius: '50%',
  },
  name: {
    ...FontBody1,
    color: TextGreyBase,
  },
  settingSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    width: '100%',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  postText: {
    ...FontBody1,
  },

  description: {
    display: '-webkit-box',
    // ['-webkit-line-clamp']: '2',
    WebkitLineClamp: 2,
    // ['-webkit-box-orient']: 'vertical',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  links: {
    display: 'flex',
    gap: 10,
  },
  chips: {
    display: 'flex',
    gap: 10,
  },
})
