'use client'
import Image from 'next/image'
import useStyles, { EditButton, EditDatesBtn } from './styles'
import SettingsIcon from '@mui/icons-material/Settings'
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, TikTokIcon, YoutubeIcon } from '@/shared/icons'
import { Routes } from '@/shared/routes'
import { IProfile } from '@/store/features/profile-slice/types'
import { Networks } from '../profile-networks'
import { Link } from '@/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { PinkBrownBase } from '../../consts/colors'
import { createRef, useEffect, useState } from 'react'
import cn from 'classnames'
import { Button, IconButton } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import DatePicker, { registerLocale } from 'react-datepicker'
import arm from 'date-fns/locale/hy'
import ru from 'date-fns/locale/ru'
import en from 'date-fns/locale/en-US'

import CheckIcon from '@mui/icons-material/Check'

import 'react-datepicker/dist/react-datepicker.css'
import { db } from '../../lib/firebaseConfig'
import { useAuth } from '../../lib/auth-context'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { Dispatch } from '@/store/store'
import { setAvailableDates } from '@/store/features/profile-slice'
import { LoadingCircle } from '../loading-circle'
// @ts-ignore
registerLocale('arm', arm)
// @ts-ignore
registerLocale('ru', ru)
// @ts-ignore
registerLocale('en', en)

export const ProfileHeader = (props: IProfile & { isMe?: boolean }) => {
  const { classes } = useStyles()
  const { user } = useAuth()

  const [isDescriptionScroll, setDescriptionScroll] = useState(false)
  const selectWrapperRef = createRef<HTMLDivElement>()
  const locale = useLocale()

  const [readMore, setReadMore] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [datesLoading, setDatesLoading] = useState(false)

  const t = useTranslations('Profile')
  const professionT = useTranslations('Professions')
  const [selectedDates, setSelectedDates] = useState(
    props.availableDates ? props.availableDates.map((dateStr) => new Date(dateStr)) : []
  )
  const dispatch = Dispatch()

  const saveDatesToFirestore = async () => {
    if (!user || !props.isMe) return
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
    console.log(newDates)
    setSelectedDates(newDates)
  }

  const iconStyle = { width: 18, height: 18 }

  const getNetworksContent = () => {
    const networks = []

    if (props?.facebook) {
      networks.push({
        href: props?.facebook,
        name: 'Facebook',
        icon: <FacebookIcon style={iconStyle} fill={PinkBrownBase} />,
      })
    }
    if (props?.instagram) {
      networks.push({
        href: props?.instagram,
        name: 'Instagram',
        icon: <InstagramIcon style={iconStyle} fill={PinkBrownBase} />,
      })
    }
    if (props?.youtube) {
      networks.push({
        href: props?.youtube,
        name: 'Youtube',
        icon: <YoutubeIcon style={iconStyle} fill={PinkBrownBase} />,
      })
    }
    if (props?.tiktok) {
      networks.push({
        href: props?.tiktok,
        name: 'Tik Tok',
        icon: <TikTokIcon style={iconStyle} fill={PinkBrownBase} />,
      })
    }

    return networks.length ? networks : []
  }

  const readMoreHandler = () => {
    setReadMore(!readMore)
  }

  const updateCheckScrollbar = () => {
    const element = selectWrapperRef.current
    if (element) {
      setDescriptionScroll(element.scrollHeight > element.clientHeight)
    }
  }

  const calendarClickHandler = () => {
    setIsDisabled(!isDisabled)
    if (isDisabled) return
    saveDatesToFirestore()
  }

  useEffect(() => {
    updateCheckScrollbar()
  }, [props.description])

  return (
    <div className={classes.root}>
      <div className={classes.infoWrapper}>
        <div className={classes.avatarSection}>
          <Image
            src={props.avatar || '/default.jpg'}
            alt="avatar"
            width={150}
            height={150}
            className={classes.avatar}
          />
        </div>
        <div className={classes.infoName}>
          <h4 className={classes.name}>{props?.name}</h4>
          <div className={classes.chips}>
            {props?.profession?.length &&
              props.profession.map((profession, index) => (
                <div key={profession} className={classes.chipItem}>
                  {professionT(profession)} {props?.profession?.length && index !== props.profession.length - 1 && '/'}
                </div>
              ))}
          </div>
          {getNetworksContent() ? (
            <div className={classes.links}>
              <Networks links={getNetworksContent()} />
            </div>
          ) : (
            <div>{t('not_networks')}</div>
          )}
        </div>
        <div className={classes.infoPhone}>
          {props.isMe ? (
            <EditButton
              size="small"
              variant="contained"
              endIcon={<SettingsIcon />}
              href={Routes.ProfileSetting}
              LinkComponent={Link}
              fullWidth
            >
              {t('edit_profile')}
            </EditButton>
          ) : (
            <div className={classes.emptySettingBtn} />
          )}
          <div className={classes.contactWrapper}>
            {props?.phone ? (
              <div className={classes.contactInfo}>
                <PhoneIcon style={iconStyle} fill={PinkBrownBase} />
                {props?.phone}
              </div>
            ) : (
              <div>{t('not_phone')}</div>
            )}
            {props?.email ? (
              <div className={classes.contactInfo}>
                <MailIcon style={iconStyle} fill={PinkBrownBase} />
                {props?.email}
              </div>
            ) : (
              <div>{t('not_email')}</div>
            )}
          </div>
        </div>
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
            {props.isMe && (
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
      </div>
      {props.description && (
        <div className={classes.descriptionWrapper}>
          <div className={cn(classes.description, { [classes.fullText]: readMore })} ref={selectWrapperRef}>
            {props?.description}
          </div>
          {isDescriptionScroll && (
            <IconButton
              size="small"
              onClick={readMoreHandler}
              sx={{ width: 30, height: 30 }}
              className={classes.showMoreBtn}
              title={t('show_less')}
            >
              {readMore ? (
                <KeyboardArrowDownIcon titleAccess={t('show_less')} color="primary" />
              ) : (
                <KeyboardArrowUpIcon titleAccess={t('read_more')} color="primary" />
              )}
            </IconButton>
          )}
        </div>
      )}
    </div>
  )
}
