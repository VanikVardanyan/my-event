import Image from 'next/image'
import { Avatar, Button, IconButton } from '@mui/material'
import useStyles from './styles'
import { useTranslations } from 'next-intl'
import { HeartIcon, InstagramIcon } from '../../icons'
import { PinkBrownBase, RedBase, TextGreyBase } from '../../consts/colors'
import { useAuth } from '../../lib/auth-context'
import { useSelector } from 'react-redux'
import { getClient, getProfile } from '@/store/selectors'
import { UserType } from '../../types/user.types'
import { toggleFavorite } from '../service-post/lib'
import { Dispatch } from '@/store/store'
import { asyncSetFavoritesThunk } from '@/store/features/client-slice'
import { SelectionModal } from '../service-post/ui/selection-modal'
import { IInstagramProfile } from '../../data/types'

const verifiedIcon = (
  <svg
    aria-label="Подтвержденный"
    className="x1lliihq x1n2onr6"
    fill="rgb(0, 149, 246)"
    height="18"
    role="img"
    viewBox="0 0 40 40"
    width="18"
  >
    <title>Подтвержденный</title>
    <path
      d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
      fillRule="evenodd"
    ></path>
  </svg>
)

export const UserCardMini = ({
  full_name,
  username,
  verified,
  followersCount,
  postsCount,
  biography,
}: IInstagramProfile) => {
  const { classes } = useStyles()
  const { user } = useAuth()
  const { profile } = useSelector(getProfile)
  const canHasFavorite = user && profile && profile.role === UserType.CLIENT
  const { favorites } = useSelector(getClient)
  const dispatch = Dispatch()

  const t = useTranslations()

  const handleFavorite = async () => {
    if (canHasFavorite) {
      await toggleFavorite(user.uid, { isInstagram: true, id: username })
      dispatch(asyncSetFavoritesThunk({ id: user.uid }))
    }
  }

  const formatNumber = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  return (
    <div className={classes.userCardWrapper}>
      <div className={classes.root}>
        <div className={classes.imgSection}>
          <div>
            <Avatar src={`/service-images/${username}.jpg`} alt={full_name} style={{ width: 45, height: 45 }} />
          </div>
          <div className={classes.name}>
            <div className={classes.text}>{full_name || username}</div> {verified && verifiedIcon}
          </div>
        </div>
        <div className={classes.actionBlock}>
          <Button
            href={`https://www.instagram.com/${username}/`}
            target="_blank"
            endIcon={<InstagramIcon fill={PinkBrownBase} />}
            variant="outlined"
            className={classes.moreBtn}
          >
            {t('more')}
          </Button>
          <IconButton onClick={handleFavorite} className={classes.mobileLike}>
            <HeartIcon
              style={{ width: 24, height: 24 }}
              fill={TextGreyBase}
              fillBg={(favorites.instagram as string[]).includes(username) ? RedBase : undefined}
            />
          </IconButton>
        </div>

        {canHasFavorite && (
          <>
            <IconButton onClick={handleFavorite} className={classes.desktopLike}>
              <HeartIcon
                style={{ width: 24, height: 24 }}
                fill={TextGreyBase}
                fillBg={(favorites.instagram as string[]).includes(username) ? RedBase : undefined}
              />
            </IconButton>
            <div className={classes.selection}>
              <SelectionModal profileId={username} profileName={username || full_name} isInstagram />
            </div>
          </>
        )}
      </div>
      <div className={classes.infoSection}>
        <div className={classes.countSection}>
          <div className={classes.countText}>
            <span className={classes.count}>{formatNumber(followersCount.toString())}</span> подписчиков
          </div>
          <div className={classes.countText}>
            <span className={classes.count}>{formatNumber(postsCount.toString())}</span> публикаций
          </div>
        </div>
        <div className={classes.biography}>{biography}</div>
      </div>
    </div>
  )
}
