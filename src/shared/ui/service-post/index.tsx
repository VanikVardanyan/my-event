'use client'

import React from 'react'
import Image from 'next/image'
import { IPostProps } from './types'
import useStyles from './styles'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Link from 'next/link'

export const ServicePost: React.FC<IPostProps> = (props: IPostProps) => {
  const { profession, description, name, avatar, images, likeCount, id } = props
  const { classes } = useStyles()

  return (
    <div className={classes.root}>
      <Link href={`/user/${id}`} className={classes.header}>
        <Image src={avatar || '/default.jpg'} alt={'image'} width={42} height={42} className={classes.avatar} />
        <div className={classes.userName}>
          {name} <span className={classes.profession}>({profession.map((item) => item).join(', ')})</span>
        </div>
      </Link>
      <div className={classes.carouselWrapper}>
        {images.length === 0 && <Image src={'/default.jpg'} alt={'default'} width={468} height={468} />}
        {images.length > 0 && (
          <Carousel showThumbs={false}>
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
          </Carousel>
        )}
      </div>
      {description && <div className={classes.description}>{description}</div>}
    </div>
  )
}
