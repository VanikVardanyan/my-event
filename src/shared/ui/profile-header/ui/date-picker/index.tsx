'use client'

import { useState } from 'react'
import cn from 'classnames'
import useStyles from './styles'
import { useLocale, useTranslations } from 'next-intl'
import DatePicker, { registerLocale } from 'react-datepicker'
import arm from 'date-fns/locale/hy'
import ru from 'date-fns/locale/ru'
import en from 'date-fns/locale/en-US'
import { Button } from '@mui/material'
import { LoadingCircle } from '../../../loading-circle'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import CheckIcon from '@mui/icons-material/Check'
import { useAuth } from '@/shared/lib/auth-context'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/shared/lib/firebaseConfig'
import { Dispatch } from '@/store/store'
import { setAvailableDates } from '@/store/features/profile-slice'
import 'react-datepicker/dist/react-datepicker.css'

// @ts-ignore
registerLocale('arm', arm)
// @ts-ignore
registerLocale('ru', ru)
// @ts-ignore
registerLocale('en', en)

interface ICalendarProps {
  availableDates: Date[]
  isMe?: boolean
}

export const Calendar = (props: ICalendarProps) => {
  const { availableDates, isMe } = props
  const { classes } = useStyles()
  const locale = useLocale()
  const { user } = useAuth()
  const dispatch = Dispatch()
  const t = useTranslations('Profile')

  const [selectedDates, setSelectedDates] = useState(
    availableDates ? availableDates.map((dateStr) => new Date(dateStr)) : []
  )
  const [isDisabled, setIsDisabled] = useState(true)
  const [datesLoading, setDatesLoading] = useState(false)

  const saveDatesToFirestore = async () => {
    if (!user || !isMe) return
    setDatesLoading(true)
    const userProfileRef = doc(db, 'profiles', user.uid)
    const userProfileSnap = await getDoc(userProfileRef)
    const currentProfile = userProfileSnap.data()

    const updatedProfile = {
      ...currentProfile,
      availableDates: selectedDates.map((date) => date.toISOString()),
    }

    await setDoc(doc(db, 'profiles', user.uid), updatedProfile).finally(() => {
      setDatesLoading(false)
      dispatch(setAvailableDates(selectedDates))
    })
  }

  const handleDateChange = (date: any) => {
    if (isDisabled) return
    const newDates: any = [...selectedDates]
    const dateIndex = newDates.findIndex((d: any) => d.getTime() === date.getTime())

    if (dateIndex !== -1) {
      newDates.splice(dateIndex, 1) // Remove the date if it's already selected
    } else {
      newDates.push(date) // Add the date if it's not selected
    }
    setSelectedDates(newDates)
  }

  const calendarClickHandler = () => {
    setIsDisabled(!isDisabled)
    if (isDisabled) return
    saveDatesToFirestore()
  }

  return (
    <div className={classes.calendarSection}>
      <div className={classes.datePickerWrapper}>
        <DatePicker
          onChange={handleDateChange}
          inline
          readOnly
          calendarClassName={cn(classes.datePicker, { [classes.datePickerDisabled]: isDisabled })}
          highlightDates={selectedDates}
          dayClassName={(date) =>
            selectedDates.find((d: any) => d.getTime() === date.getTime()) ? classes.selectedDate : ''
          }
          disabled={isDisabled}
          locale={locale}
        />
        <div className={cn(classes.datePickerDisabledWrapper, { [classes.datePickerDisabledOpen]: !isDisabled })} />
      </div>
      <div className={classes.calendarActions}>
        {isMe && (
          <Button variant="outlined" onClick={calendarClickHandler}>
            {datesLoading && <LoadingCircle />}
            {!datesLoading &&
              (isDisabled ? (
                <ModeEditIcon style={{ width: 18, height: 18 }} />
              ) : (
                <CheckIcon style={{ width: 18, height: 18 }} />
              ))}
          </Button>
        )}
        <div className={classes.dayHelper}>
          <div className={classes.freeDay} /> {t('freeDay')}
        </div>
        <div className={classes.dayHelper}>
          <div className={classes.busy} /> {t('busyDay')}
        </div>
      </div>
    </div>
  )
}
