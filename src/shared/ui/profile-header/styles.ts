import {
  DarkBlueBase,
  DarkBlueDarken4,
  DarkBlueLighten30,
  PinkBrownBase,
  PinkBrownDisabled,
  PinkBrownLighten30,
  SlateGreyLighten13,
  SlateGreyLighten21,
  TextGreyBase,
  TextSlateGreyLighten8,
} from '@/shared/consts/colors'
import { FontBody1, FontBody1Accent, FontH4 } from '@/shared/consts/fontStyles'
import { tss } from 'tss-react/mui'
import { BreakPoints } from '../../consts/common'
import { Button, styled } from '@mui/material'

export default tss.withName('ProfileHeader').create({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 28,
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
    objectFit: 'cover',
  },
  name: {
    ...FontH4,
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
  infoWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    flexDirection: 'column',

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      flexDirection: 'row',
      gap: 50,
    },
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
    marginBottom: 10,
  },
  fullText: {
    WebkitLineClamp: 'none',
    display: 'block',
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
    gap: 5,
  },
  chipItem: {
    ...FontBody1Accent,
    color: TextSlateGreyLighten8,
  },
  infoName: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    alignItems: 'center',

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      gap: 25,
      alignItems: 'flex-start',
    },
  },
  infoPhone: {
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    gap: 14,
    width: '100%',

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      gap: 25,
      flexDirection: 'column',
      width: 'inherit',
      alignItems: 'flex-start',
    },
  },
  contactInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
  },
  emptySettingBtn: {
    height: 24,
    display: 'none',

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      display: 'block',
    },
  },
  contactWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    alignSelf: 'center',

    [`@media (min-width: ${BreakPoints.MEDIUM})`]: {
      gap: 25,
      alignSelf: 'flex-end',
    },
  },
})

export const EditButton = styled(Button)({
  backgroundColor: PinkBrownBase,
  color: 'white',

  '&:hover': {
    backgroundColor: PinkBrownLighten30,
  },
})

export const AddRequestButton = styled(Button)({
  backgroundColor: DarkBlueLighten30,
  color: 'white',

  '&:hover': {
    backgroundColor: DarkBlueDarken4,
  },
})
