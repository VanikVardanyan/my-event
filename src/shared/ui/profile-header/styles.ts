import {
  DarkBlueBase,
  DarkBlueDarken4,
  DarkBlueLighten30,
  PinkBrownBase,
  PinkBrownLighten30,
  PurpleBase,
  TextGreyBase,
  TextGreyDarken7,
  TextSlateGreyBase,
  TextSlateGreyLighten8,
  White,
} from '@/shared/consts/colors'
import { FontBody1, FontBody1Accent, FontH4 } from '@/shared/consts/fontStyles'
import { tss } from 'tss-react/mui'
import { BreakPoints } from '../../consts/common'
import { Button, IconButton, styled } from '@mui/material'

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

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      flexDirection: 'row',
    },
  },
  infoWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    flexDirection: 'column',

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      flexDirection: 'row',
      gap: 50,
    },
  },

  postText: {
    ...FontBody1,
  },
  description: {
    ...FontBody1,
    color: TextGreyDarken7,
    display: '-webkit-box',
    // ['-webkit-line-clamp']: '2',
    WebkitLineClamp: 2,
    // ['-webkit-box-orient']: 'vertical',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: 10,
  },
  descriptionWrapper: {
    position: 'relative',
  },
  showMoreBtn: {
    margin: '24px 0 10px',
    position: 'absolute',
    right: 8,
    bottom: '-18px',
  },
  fullText: {
    WebkitLineClamp: 'none',
    display: 'block',
  },
  links: {
    display: 'flex',
    gap: 10,
    justifyContent: 'center',

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
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

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
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

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
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

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      display: 'block',
    },
  },
  contactWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    alignSelf: 'center',

    [`@media (min-width: ${BreakPoints.LARGE})`]: {
      gap: 25,
      alignSelf: 'flex-end',
    },
  },
  calendarSection: {
    width: '100%',
  },
  selectedDate: {
    background: `${DarkBlueBase} !important`,
    color: `${White} !important`,
  },
  datePicker: {
    width: '100%',
    border: `1px solid ${PinkBrownBase}`,

    '& .react-datepicker__header': {
      background: PinkBrownBase,
    },

    '& .react-datepicker__month-container': {
      width: '100%',
    },

    '& .react-datepicker__day-name': {
      color: White,
    },

    '& .react-datepicker__current-month': {
      color: White,
    },
  },
  datePickerDisabled: {
    '& .react-datepicker__day': {
      cursor: 'default',

      '&:hover': {
        background: 'none',
      },
    },
    '& .react-datepicker__day--keyboard-selected': {
      background: 'none',
    },
  },
  dayHelper: {
    display: 'flex',
    gap: 3,
    alignItems: 'center',
  },
  freeDay: {
    width: 20,
    height: 20,
    border: `2px solid ${TextSlateGreyBase}`,
    borderRadius: '50%',
  },
  busy: {
    width: 20,
    height: 20,
    border: `2px solid ${TextSlateGreyBase}`,
    borderRadius: '50%',
    background: DarkBlueBase,
  },
  calendarActions: {
    display: 'flex',
    gap: 5,
    marginTop: 5,
  },
  datePickerWrapper: {
    position: 'relative',
  },
  datePickerDisabledWrapper: {
    position: 'absolute',
    left: '0%',
    top: 0,
    right: 0,
    bottom: 5,
    background: 'rgba(0, 0, 0, 0.1)',
    transition: '0.3s',
  },
  datePickerDisabledOpen: {
    left: '100%',
  },
})

export const EditButton = styled(Button)({
  backgroundColor: PinkBrownBase,
  color: 'white',

  '&:hover': {
    backgroundColor: PinkBrownLighten30,
  },
})

export const EditDatesBtn = styled(Button)({
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
