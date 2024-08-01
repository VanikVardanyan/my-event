import { Container } from '../../styles'
import { Metadata } from 'next'
import { ShowManRoot } from './ui'

export const metadata: Metadata = {
  title: 'Van Event - Շոումեններ',
  description:
    'Իմացեք բոլոր շոումենների մասին, որոնք մատչելի են ձեր միջոցառման համար: Գրանցվեք Van Event հարթակում և գտնեք լավագույն շոումեններին:',
  keywords: 'շոումեններ, միջոցառումներ, շոումենների ծառայություններ, Van Event',
  openGraph: {
    title: 'Van Event - Շոումեններ',
    description:
      'Իմացեք բոլոր շոումենների մասին, որոնք մատչելի են ձեր միջոցառման համար: Գրանցվեք Van Event հարթակում և գտնեք լավագույն շոումեններին:',
    url: 'https://www.van-event.app/arm/showman',
    images: ['https://www.van-event.app/main/showman.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Van Event - Շոումեններ',
    description:
      'Իմացեք բոլոր շոումենների մասին, որոնք մատչելի են ձեր միջոցառման համար: Գրանցվեք Van Event հարթակում և գտնեք լավագույն շոումեններին:',
    images: ['https://www.van-event.app/main/showman.jpg'],
  },
}

const ShowMan = () => {
  return (
    <Container>
      <ShowManRoot />
    </Container>
  )
}

export default ShowMan
