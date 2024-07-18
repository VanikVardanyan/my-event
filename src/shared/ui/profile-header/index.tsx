'use client'
import Image from 'next/image'
import useStyles, { EditButton } from './styles'
import SettingsIcon from '@mui/icons-material/Settings'
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, TikTokIcon, YoutubeIcon } from '@/shared/icons'
import { Routes } from '@/shared/routes'
import { IProfile } from '@/store/features/profile-slice/types'
import { Networks } from '../profile-networks'
import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'
import { PinkBrownBase } from '../../consts/colors'
import { useState } from 'react'
import cn from 'classnames'

export const ProfileHeader = (props: IProfile & { isMe?: boolean }) => {
  const { classes } = useStyles()
  const [readMore, setReadMore] = useState(false)
  const t = useTranslations('Profile')

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
  console.log(props.avatar, 'avatar is header')

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
            {props?.profession
              ?.join(' | ')
              .split(' ')
              .map((profession) => (
                <div key={profession} className={classes.chipItem}>
                  {profession}
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
      </div>
      {props.description && (
        <div>
          <div className={cn(classes.description, { [classes.fullText]: readMore })}>{props?.description}</div>
          <EditButton size="small" variant="contained" onClick={readMoreHandler}>
            {readMore ? t('show_less') : t('read_more')}
          </EditButton>
        </div>
      )}
    </div>
  )
}
