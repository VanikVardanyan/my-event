'use client'
import Image from 'next/image'
import useStyles from './styles'
import { Button } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import { Chip } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'
import FacebookIcon from '@mui/icons-material/Facebook'
import { TikTokIcon } from '@/shared/icons'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import { Routes } from '@/shared/routes'
import { IProfile } from '@/store/features/profile-slice/types'
import { Networks } from '../profile-networks'
import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'

export const ProfileHeader = (props: IProfile & { isMe?: boolean }) => {
  const { classes } = useStyles()
  const t = useTranslations('Profile')
  const p = useTranslations('Professions')

  const getNetworksContent = () => {
    const networks = []

    if (props?.facebook) {
      networks.push({
        href: props?.facebook,
        name: 'Facebook',
        icon: <FacebookIcon />,
      })
    }
    if (props?.instagram) {
      networks.push({
        href: props?.instagram,
        name: 'Instagram',
        icon: <InstagramIcon />,
      })
    }
    if (props?.youtube) {
      networks.push({
        href: props?.youtube,
        name: 'Youtube',
        icon: <YouTubeIcon />,
      })
    }
    if (props?.tiktok) {
      networks.push({
        href: props?.tiktok,
        name: 'Tik Tok',
        icon: <TikTokIcon />,
      })
    }
    if (props?.phone) {
      networks.push({
        href: '',
        name: props?.phone,
        icon: <PhoneIcon />,
      })
    }
    if (props?.email) {
      networks.push({
        href: `mailto:${props?.email}`,
        name: props?.email,
        icon: <EmailIcon />,
      })
    }
    return networks.length ? networks : []
  }

  return (
    <div className={classes.root}>
      <div className={classes.avatarSection}>
        <Image src={props.avatar || '/default.jpg'} alt="avatar" width={150} height={150} className={classes.avatar} />
      </div>
      <div className={classes.info}>
        <div className={classes.settingSection}>
          <div className={classes.name}>{props?.name}</div>
          <div className={classes.chips}>
            {props?.profession?.map((profession) => <Chip label={p(profession)} key={profession} />)}
          </div>
          {props.isMe && (
            <Button variant="contained" endIcon={<SettingsIcon />} href={Routes.ProfileSetting} LinkComponent={Link}>
              {t('edit_profile')}
            </Button>
          )}
        </div>
        {getNetworksContent() && (
          <div className={classes.links}>
            <Networks links={getNetworksContent()} />
          </div>
        )}

        <div className={classes.description}>{props?.description}</div>
      </div>
    </div>
  )
}
