import React, { useRef, useState } from 'react'
import Slider from 'react-slick'
import { ServiceCard } from '@/shared/ui/service-card'
import { PinkBrownBase } from '@/shared/consts/colors'
import { useTranslations } from 'next-intl'
import { serviceListMock } from '@/shared/utils/main-helper'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import useStyles from './useStyles'
import { Button } from '@/shared/ui/button'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'

interface ArrowProps {
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
  currentIndex: number
  someMaxIndex: number
}

const NextArrow: React.FC<ArrowProps> = ({ className, onClick, currentIndex, someMaxIndex }) => {
  return (
    <div
      className={className}
      onClick={currentIndex < someMaxIndex ? onClick : undefined}
      style={{
        display: currentIndex < someMaxIndex ? 'flex' : 'none',
      }}
    >
      <ArrowForwardIosIcon style={{ color: PinkBrownBase }} />
    </div>
  )
}

const PrevArrow: React.FC<ArrowProps> = ({ className, onClick, currentIndex }) => {
  return (
    <div
      className={className}
      onClick={currentIndex > 0 ? onClick : undefined}
      style={{
        display: currentIndex > 0 ? 'flex' : 'none',
      }}
    >
      <ArrowBackIosNewIcon style={{ color: PinkBrownBase }} />
    </div>
  )
}

export const Categories = () => {
  const categoryRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const t = useTranslations()
  const { classes } = useStyles()

  const settings = {
    beforeChange: (_: number, newIndex: number) => setCurrentIndex(newIndex),
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: true,
    centerMode: false,
    arrows: true,
    nextArrow: <NextArrow currentIndex={currentIndex} someMaxIndex={serviceListMock.length} />,
    prevArrow: <PrevArrow currentIndex={currentIndex} someMaxIndex={serviceListMock.length} />,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.descriptionSection}>
          <h3 className={classes.title}>Կատեգորիաներ</h3>
          <div className={classes.subTitle}>
            Մենք առաջարկում ենք բազմազան ծառայություններ, որոնք կօգնեն ձեզ կազմակերպել միջոցառման յուրաքանչյուր մանրուք:
          </div>
          <div className={classes.subTitleBold}>
            Ընտրեք անհրաժեշտ կատեգորիան՝ լինի դա շոու-ծրագիր, հագուստի վարձույթ, մեքենաների վարձակալություն, տորթերի
            պատրաստում կամ DJ-ների և երաժշտական ծրագրերի ապահովում:{' '}
          </div>
          <div className={classes.subTitle}>
            Մեր հարթակում կարող եք գտնել և միավորել բոլոր անհրաժեշտ ծառայությունները՝ կատարյալ միջոցառման համար։
          </div>
        </div>
        <div className={classes.slickWrapper}>
          <div className={classes.slick}>
            <Slider {...settings}>
              {serviceListMock.map((service) => (
                <ServiceCard {...service} key={service.link} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <Button endIcon={<DoubleArrowIcon />} className={classes.btnAction}>
        Դառնալ մատակարար
      </Button>
    </div>
  )
}
