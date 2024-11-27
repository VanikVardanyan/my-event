'use client'
import Image from 'next/image'
import useStyles, { MessageButton, EditButton } from './styles'
import SettingsIcon from '@mui/icons-material/Settings'
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, TikTokIcon, YoutubeIcon } from '@/shared/icons'
import { Routes } from '@/shared/routes'
import { IProfile } from '@/store/features/profile-slice/types'
import { Networks } from '../profile-networks'
import { Link, useRouter } from '@/navigation'
import { useTranslations } from 'next-intl'
import { PinkBrownBase } from '../../consts/colors'
import { createRef, useEffect, useState } from 'react'
import cn from 'classnames'
import { IconButton } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import { Calendar } from './ui/date-picker'
import { useAuth } from '../../lib/auth-context'
import MarkunreadIcon from '@mui/icons-material/Markunread'
import { IThread } from './types'
import { query } from 'firebase/database'
import { collection, doc, DocumentData, getDocs, Query, setDoc, where } from 'firebase/firestore'
import { db } from '../../lib/firebaseConfig'

export const ProfileHeader = (props: IProfile & { isMe?: boolean } & { thread?: IThread }) => {
  const { classes } = useStyles()
  const { user } = useAuth()
  const router = useRouter()

  const [isDescriptionScroll, setDescriptionScroll] = useState(false)
  const selectWrapperRef = createRef<HTMLDivElement>()

  const [readMore, setReadMore] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)

  const t = useTranslations()

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

  const messageHandler = async () => {
    if (!props.thread) return

    const threadsRef = collection(db, 'threads')
    // @ts-ignore
    const q: Query<DocumentData> = query(threadsRef, where('participants', 'array-contains', props.thread.author_id))

    const querySnapshot = await getDocs(q)

    let existingThread = null

    querySnapshot.forEach((doc) => {
      const thread = doc.data()
      // @ts-ignore
      if (thread.participants.includes(props.thread.recipient_id)) {
        existingThread = thread
      }
    })

    if (existingThread) {
      router.push(Routes.Messages)
    } else {
      const newThreadRef = doc(threadsRef)
      const newThread = {
        id: newThreadRef.id,
        participants: [props.thread.author_id, props.thread.recipient_id],
        messages: [],
      }

      await setDoc(newThreadRef, newThread)
      router.push(Routes.Messages)
    }
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
            {props?.profession?.length && (
              <div className={classes.chipItem}>
                {t(props.profession[0])}
                {props?.profession?.length > 1 && ','}
              </div>
            )}
            {props?.profession && props?.profession?.length > 1 && (
              <span className={classes.chipItem}>{t(props.profession[1])}</span>
            )}
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
        <Calendar isMe={props.isMe} availableDates={props.availableDates} />
      </div>
      {props.description && (
        <div className={classes.descriptionWrapper}>
          <div
            className={cn(classes.description, { [classes.fullText]: readMore })}
            ref={selectWrapperRef}
            dangerouslySetInnerHTML={{ __html: props?.description }}
          />

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
      {!props.isMe && (
        <div>
          <MessageButton startIcon={<MarkunreadIcon />} onClick={messageHandler}>
            Написать
          </MessageButton>
        </div>
      )}
    </div>
  )
}
