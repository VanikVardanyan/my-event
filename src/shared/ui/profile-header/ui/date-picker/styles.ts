import { tss } from 'tss-react/mui'
import { DarkBlueBase, PinkBrownBase, TextSlateGreyBase, White } from '@/shared/consts/colors'

export default tss.withName('Calendar').create({
  datePicker: {
    width: '100%',
    border: `1px solid ${DarkBlueBase}`,

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
  selectedDate: {
    background: `${DarkBlueBase} !important`,
    color: `${White} !important`,
  },
  calendarSection: {
    width: '100%',
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
  calendarActions: {
    display: 'flex',
    gap: 5,
    marginTop: 5,
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
})
