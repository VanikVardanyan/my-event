'use client'
import useStyles, { Container, StartButton } from '../styles'
import { Link, useRouter } from '@/navigation'
import { Routes } from '@/shared/routes'
import { useTranslations } from 'next-intl'
import { UserType } from '@/shared/types/user.types'
import { ServiceCard } from '@/shared/ui/service-card'
import { useRef } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, IconButton } from '@mui/material'
import { useSelector } from 'react-redux'
import { getProfile } from '@/store/selectors'
import Slider from 'react-slick'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { questions, serviceListMock, workSteps } from '@/shared/utils/main-helper'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { WorkCard } from '@/shared/ui/home-work-card'
import { PinkBrownBase, SlateGreyBase } from '@/shared/consts/colors'
import { VideoCard } from '@/shared/ui/videoCard'
import { sendGA4Event } from '@/shared/analytics/ga4'
import { GA4_ACTIONS, GA4_PLACES } from '@/shared/analytics/types'
import { PinkButton } from '@/shared/ui/button'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import { PlanItems, professionList } from './utils'
import { PlanComponent } from './ui/plan-cpmponent'

const videoListMock = [
  {
    link: 'https://www.youtube.com/embed/zVDhVjFqQBs', // Ссылка на видео
    title: 'happy birthday', // Заголовок или текст
    description: 'This is a description for video 1', // Описание или любой другой текст
  },
  {
    link: 'https://www.youtube.com/embed/PEIgbYXgKQk',
    title: 'Video Title 2',
    description: 'This is a description for video 2',
  },
  {
    link: 'https://www.youtube.com/embed/IhTs70El5SU',
    title: 'Video Title 3',
    description: 'This is a description for video 3',
  },
  {
    link: 'https://www.youtube.com/embed/qX8ZU1nFb8o',
    title: 'Video Title 3',
    description: 'This is a description for video 3',
  },
  {
    link: 'https://www.youtube.com/embed/ihJfpKsPH_w',
    title: 'Video Title 3',
    description: 'This is a description for video 3',
  },
  {
    link: 'https://www.youtube.com/embed/eMD9907f-N4',
    title: 'Video Title 3',
    description: 'This is a description for video 3',
  },
  {
    link: 'https://www.youtube.com/embed/JhmhKGJy73w',
    title: 'Video Title 3',
    description: 'This is a description for video 3',
  },
  {
    link: 'https://www.youtube.com/embed/H68cS21ML3Y',
    title: 'Video Title 3',
    description: 'This is a description for video 3',
  },
]

interface ArrowProps {
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

const NextArrow: React.FC<ArrowProps> = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIosIcon style={{ color: SlateGreyBase }} />
    </div>
  )
}

const PrevArrow: React.FC<ArrowProps> = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIosNewIcon style={{ color: SlateGreyBase }} />
    </div>
  )
}

// export const metadata: Metadata = {
//   title: 'Van Event - Մասնագիտացված հարթակ միջոցառումների համար',
//   description:
//     'Van Event-ն առաջարկում է միջոցառումների լայն ընտրանի ծառայություններ, ներառյալ շոումեններ, լուսանկարիչներ, դիջեյներ և ավտոմեքենաների վարձույթ։ Գրանցում և հարցումների ստեղծում մատչելի են օգտվողների և ծառայության մատուցողների համար:',
//   keywords:
//     'միջոցառումներ, շոումեններ, լուսանկարիչներ, դիջեյներ, ավտոմեքենաների վարձույթ, միջոցառումների ծառայություններ',
//   openGraph: {
//     title: 'Van Event - Մասնագիտացված հարթակ միջոցառումների համար',
//     description:
//       'Van Event-ն առաջարկում է միջոցառումների ծառայություններ, ներառյալ շոումեններ, լուսանկարիչներ և ավտոմեքենաների վարձույթ։ Գրանցվեք, որպեսզի ստեղծեք հարցումներ և ստանաք առաջարկություններ ծառայության մատուցողներից:',
//     url: 'https://www.van-event.app/',
//     images: ['https://www.van-event.app/logo/png/logo-color.png'],
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'Van Event - Մասնագիտացված հարթակ միջոցառումների համար',
//     description:
//       'Van Event-ն առաջարկում է միջոցառումների ծառայություններ, ներառյալ շոումեններ, լուսանկարիչներ և ավտոմեքենաների վարձույթ։ Գրանցվեք, որպեսզի ստեղծեք հարցումներ և ստանաք առաջարկություններ ծառայության մատուցողներից:',
//     images: ['https://www.van-event.app/logo/png/logo-color.png'],
//   },
// }

export default function Home() {
  const { classes } = useStyles()
  const History = useRouter()
  const { profile } = useSelector(getProfile)
  const t = useTranslations('Main')

  const categoryRef = useRef<HTMLDivElement>(null)

  const handleStartClick = () => {
    const fixedElementHeight = 62
    sendGA4Event({ action: GA4_ACTIONS.ACCOUNT_START_TO_CREATE, place: GA4_PLACES.MAIN })

    if (categoryRef.current) {
      const yOffset = -fixedElementHeight
      const y = categoryRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
          arrows: true,
        },
      },
      {
        breakpoint: 1114,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
          arrows: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  }

  return (
    <div>
      <div className={classes.root}>
        <div className={classes.content}>
          <p className={classes.description}>{t('organize_your_events_quickly')}</p>
          <h3 className={classes.title}>
            {t.rich('organize_your_events', {
              highlight: (chunks) => <span style={{ color: PinkBrownBase }}>{chunks}</span>,
            })}{' '}
          </h3>
          <div className={classes.headerActions}>
            {profile?.role !== UserType.PROVIDER && (
              <PinkButton LinkComponent={Link} href={Routes.CreateEvent} endIcon={<KeyboardDoubleArrowRightIcon />}>
                {t('start')}
              </PinkButton>
            )}
          </div>
        </div>
        <div className={classes.professionSmallList}>
          {professionList.map((item, index) => (
            <div key={item} className={classes.professionSmallListItem}>
              <div className={classes.professionSmallListItemText}>{item}</div>
              {index !== professionList.length - 1 && (
                <div className={classes.professionSmallListCircle}>
                  <div className={classes.professionSmallListCircleFill} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={classes.headerBottom} />
      </div>
      <div className={classes.howWorkWrapper}>
        <div className={classes.howWorkSubTitle}>
          Մեր հարթակը տրամադրում է գործիքներ, որոնք կօգնեն ձեզ կազմակերպել անմոռանալի միջոցառումներ
        </div>
        <h2 className={classes.howWorkTitle}>Ի՞նչ ենք մենք առաջարկում</h2>
        <div className={classes.howWorkDescription}>
          Մենք առաջարկում ենք ամբողջական միջոցառումների պլանավորում՝ սկսած սննդից մինչև վայրը և դեկորը: <br />{' '}
          <span className={classes.howWorkDescriptionBold}>Մեր առաքելությունն</span> է օգնել ձեզ ստեղծել անմոռանալի
          պահեր՝ օգտագործելով հարմար և հեշտ գործիքներ, որոնք նախատեսված են ինչպես հաճախորդների, այնպես էլ ոլորտի
          մասնագետների համար։
        </div>
      </div>
      <div className={classes.planWrapper}>
        <PlanComponent {...PlanItems.plan} />
        <div className={classes.planWrapperBorder} />
        <PlanComponent {...PlanItems.event} />
      </div>
      <div className={classes.titleWrapper}>
        <div className={classes.titleBorder} ref={categoryRef} />
        <h2 className={classes.categories}>{t('categories')}</h2>
        <div className={classes.subTitle}>{t('find_professionals')}</div>
      </div>
      <div className={classes.slickWrapper}>
        {' '}
        <div className={classes.slick}>
          <Slider {...settings}>
            {serviceListMock.map((service) => (
              <ServiceCard {...service} key={service.link} />
            ))}
          </Slider>
        </div>
      </div>
      <div className={classes.titleWrapper}>
        <div className={classes.titleBorder} />
        <h2 className={classes.categories}>{t('event_example')}</h2>
        <div className={classes.subTitle}>{t('find_professionals')}</div>
      </div>
      <div className={classes.slickWrapper}>
        {' '}
        <div className={classes.slick}>
          <Slider {...settings}>
            {videoListMock.map((service) => (
              <VideoCard {...service} key={service.link} />
            ))}
          </Slider>
        </div>
      </div>

      <Container>
        <div className={classes.titleWrapper}>
          <div className={classes.titleBorder} />
          <h2 className={classes.categories}>{t('have_questions_have_answers')}</h2>
        </div>
        <div className={classes.questionsWrapper}>
          {questions.map((question) => (
            <Accordion key={question.question} sx={{ borderRadius: '6px' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                {t(question.question)}
              </AccordionSummary>
              <AccordionDetails>{t(question.answer)}</AccordionDetails>
            </Accordion>
          ))}
        </div>
      </Container>
    </div>
  )
}
