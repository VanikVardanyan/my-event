'use client'
import Head from 'next/head'
import React from 'react'
import Image from 'next/image'
import { IPostProps } from './types'
import useStyles from './styles'
// import { Carousel } from 'react-responsive-carousel'
// import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}

export const ServicePost: React.FC<IPostProps> = (props: IPostProps) => {
  const { profession, description, name, avatar, images, likeCount, id } = props
  const { classes } = useStyles()
  const p = useTranslations('Professions')

  return (
    <div className={classes.root}>
      <Link href={`/user/${id}`} className={classes.header}>
        <Image src={avatar || '/default.jpg'} alt={'image'} width={42} height={42} className={classes.avatar} />
        <div className={classes.userName}>
          {name} <span className={classes.profession}>({profession.map((item) => p(item)).join(', ')})</span>
        </div>
      </Link>
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
      {description && <div className={classes.description}>{description}</div>}
    </div>
  )
}
