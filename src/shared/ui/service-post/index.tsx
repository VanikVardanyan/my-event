'use client'
import React, { createRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { IPostProps } from './types'
import useStyles from './styles'
import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'
import Slider from 'react-slick'

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { IconButton } from '@mui/material'
import { HeartIcon } from '../../icons'
import { RedBase, TextGreyBase } from '../../consts/colors'
import { toggleFavorite } from './lib'
import { useAuth } from '../../lib/auth-context'
import { useSelector } from 'react-redux'
import { getClient, getProfile } from '@/store/selectors'
import { UserType } from '../../types/user.types'
import { Dispatch } from '@/store/store'
import { asyncSetFavoritesThunk } from '@/store/features/client-slice'
import cn from 'classnames'
import { SelectionModal } from './ui/selection-modal'

const SamplePrevArrow = (props: any) => {
  const { onClick, currentSlide } = props
  const { classes } = useStyles()
  if (currentSlide === 0) {
    return null
  }

  return (
    <div onClick={onClick} className={cn('arrow-btn prev', classes.arrowRight)}>
      <NavigateBeforeIcon style={{ color: 'black' }} />
    </div>
  )
}

function SampleNextArrow(props: any) {
  const { onClick, slideCount, currentSlide } = props
  const { classes } = useStyles()

  if (slideCount - 1 === currentSlide) {
    return null
  }
  return (
    <div onClick={onClick} className={cn('arrow-btn next', classes.arrowLeft)}>
      <NavigateNextIcon style={{ color: 'black' }} />
    </div>
  )
}

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow to="next" />,
  prevArrow: <SamplePrevArrow to="prev" />,
  arrow: false,
}

export const ServicePost: React.FC<IPostProps> = (props: IPostProps) => {
  const { profession, description, name, avatar, images, id } = props
  const [readMore, setReadMore] = useState(false)
  const [isDescriptionScroll, setDescriptionScroll] = useState(false)

  const { classes } = useStyles()
  const p = useTranslations('Professions')
  const t = useTranslations('Profile')
  const { user } = useAuth()
  const { profile } = useSelector(getProfile)
  const { favorites } = useSelector(getClient)
  const dispatch = Dispatch()

  const selectWrapperRef = createRef<HTMLDivElement>()

  const canHasFavorite = user && profile && profile.role === UserType.CLIENT

  const handleFavorite = async () => {
    if (canHasFavorite) {
      await toggleFavorite(user.uid, { id })
      dispatch(asyncSetFavoritesThunk({ id: user.uid }))
    }
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

  useEffect(() => {
    updateCheckScrollbar()
  }, [description])

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Link href={`/user/${id}`} className={classes.headerName}>
          <Image src={avatar || '/default.jpg'} alt={'image'} width={42} height={42} className={classes.avatar} />
          <div className={classes.userName}>
            {name} <span className={classes.profession}>({profession.map((item) => p(item)).join(', ')})</span>
          </div>
        </Link>

        {canHasFavorite && <SelectionModal profileId={id} profileName={name} isInstagram={false} />}
      </div>
      <div className={classes.carouselWrapper}>
        {(images?.length === 0 || !images) && (
          <Image src={'/default.jpg'} alt={'default'} width={468} height={468} className={classes.carouselImage} />
        )}
        {images && images.length > 0 && (
          <Slider {...settings} className={classes.slider}>
            {images.map((url) => (
              <div key={url}>
                <Image
                  src={url || '/default.jpg'}
                  alt={name}
                  width={468}
                  height={468}
                  className={classes.carouselImage}
                />
              </div>
            ))}
          </Slider>
        )}
      </div>
      {canHasFavorite && (
        <IconButton onClick={handleFavorite} sx={{ marginTop: '20px' }}>
          <HeartIcon
            style={{ width: 24, height: 24 }}
            fill={TextGreyBase}
            fillBg={(favorites.direct as string[]).includes(id) ? RedBase : undefined}
          />
        </IconButton>
      )}
      {description && (
        <div className={classes.descriptionWrapper}>
          <div className={cn(classes.description, { [classes.fullText]: readMore })} ref={selectWrapperRef}>
            {description}
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
