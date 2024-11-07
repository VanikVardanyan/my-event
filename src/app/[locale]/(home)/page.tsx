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

import { questions } from '@/shared/utils/main-helper'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { PinkBrownBase, SlateGreyBase } from '@/shared/consts/colors'
import { VideoCard } from '@/shared/ui/videoCard'
import { sendGA4Event } from '@/shared/analytics/ga4'
import { GA4_ACTIONS, GA4_PLACES } from '@/shared/analytics/types'
import { PinkButton } from '@/shared/ui/button'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import { PlanItems, professionList } from './utils'
import { PlanComponent } from './ui/plan-cpmponent'
import { Categories } from './ui/categories'
import { Blog } from './ui/blog'

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

      {/* <div className={classes.titleWrapper}>
        <div className={classes.titleBorder} />
        <h2 className={classes.categories}>{t('event_example')}</h2>
        <div className={classes.subTitle}>{t('find_professionals')}</div>
      </div> */}
      {/* <div className={classes.slickWrapper}>
        {' '}
        <div className={classes.slick}>
          <Slider {...settings}>
            {videoListMock.map((service) => (
              <VideoCard {...service} key={service.link} />
            ))}
          </Slider>
        </div>
      </div> */}

      <Container>
        <div className={classes.planWrapper}>
          <PlanComponent {...PlanItems.plan} />
          <div className={classes.planWrapperBorder} />
          <PlanComponent {...PlanItems.event} />
        </div>

        <Categories />
      </Container>
      <Blog />
    </div>
  )
}
