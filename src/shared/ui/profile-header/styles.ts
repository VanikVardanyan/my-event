import { TextGreyBase } from '@/shared/consts/colors'
import { FontBody1 } from '@/shared/consts/fontStyles'
import { tss } from 'tss-react/mui'
import { BreakPoints } from '../../consts/common'

export default tss.withName('ProfileHeader').create({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 28,

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      flexDirection: 'row',
    },
  },
  avatarSection: {
    width: 181,
    objectFit: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    width: '100%',

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      flexDirection: 'row',
    },
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
    justifyContent: 'center',

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      justifyContent: 'flex-start',
    },
  },
  chips: {
    display: 'flex',
    gap: 10,
  },
})
