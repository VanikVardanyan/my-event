import { Routes } from '../routes'
import { Professions } from '../types/user.types'

import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import SearchIcon from '@mui/icons-material/Search'
import AssignmentIcon from '@mui/icons-material/Assignment'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { PurpleBase } from '../consts/colors'
interface IService {
  name: string
  description: string
  image: string
  link: Routes
}

export const serviceListMock: IService[] = [
  {
    name: 'Լուսանկարիչ',
    description: 'Ստեղծագործ, պրոֆեսիոնալ և հմուտ',
    image: '/professions/photographer.png',
    link: Routes.Photographer,
  },
  {
    name: 'Շոու ծրագիր',
    description: 'Զվարճալի, դինամիկ և հետաքրքիր',
    image: '/professions/show.png',
    link: Routes.Show,
  },
  {
    name: 'Տորթեր',
    description: 'Համեղ, գեղեցիկ և յուրահատուկ',
    image: '/professions/cake.png',
    link: Routes.Cakes,
  },
  {
    name: 'Պար',
    description: 'Ռիթմիկ, էներգետիկ և գրավիչ',
    image: '/professions/dance.png',
    link: Routes.DancersEntertainers,
  },
  {
    name: 'DJ',
    description: 'Տպավորիչ, պրոֆեսիոնալ և զվարճալի',
    image: '/professions/dj.png',
    link: Routes.Dj,
  },
  {
    name: 'Երգիչներ և երաժիշտներ',
    description: 'Տաղանդավոր և պրոֆեսիոնալ',
    image: '/professions/musician.png',
    link: Routes.Musicians,
  },
  {
    name: 'Ֆլորիստներ և դիզայներներ',
    description: 'Ստեղծագործ, գեղեցիկ և վառ',
    image: '/professions/designer.png',
    link: Routes.FloristsDecorators,
  },
  {
    name: 'Երեկոյան զգեստներ',
    description: 'էլեգանտ, առանձնահատուկ և ժամանակակից',
    image: '/professions/dress.png',
    link: Routes.CostumeRental,
  },
  {
    name: 'Ռեստորաններ',
    description: 'Համեղ, հյուրընկալ և բազմազան',
    image: '/professions/restaurant.png',
    link: Routes.Restaurants,
  },
  {
    name: 'Սարքավորումների և իրերի վարձույթ',
    description: 'Բազմազան, հարմար և պրոֆեսիոնալ',
    image: '/professions/party.png',
    link: Routes.EquipmentRental,
  },
  {
    name: 'Ավտոմեքենաների վարձույթ',
    description: 'Հարմար, արագ և անվտանգ',
    image: '/professions/car.png',
    link: Routes.CarsRental,
  },
  {
    name: 'Շոումեն',
    description: 'Զվարճանք, էներգիա և շփում',
    image: '/professions/showman.png',
    link: Routes.Showman,
  },
]

export const workSteps = [
  {
    title: 'step1_title',
    description: 'step1_description',
    icon: <EventAvailableIcon style={{ width: 60, height: 60 }} />,
  },
  {
    title: 'step3_title',
    description: 'step3_description',
    icon: <ManageAccountsIcon style={{ width: 60, height: 60 }} />,
  },
  {
    title: 'step2_title',
    description: 'step2_description',
    icon: <SearchIcon style={{ width: 60, height: 60 }} />,
  },
  {
    title: 'step4_title',
    description: 'step4_description',
    icon: <FavoriteBorderIcon style={{ width: 60, height: 60 }} />,
  },
]

export const questions = [
  {
    question: 'how_do_event_planners_find_me',
    answer: 'how_do_event_planners_find_me_answer',
  },
  {
    question: 'how_many_leads_and_bookings_can_i_expect',
    answer: 'how_many_leads_and_bookings_can_i_expect_answer',
  },
  {
    question: 'do_i_have_to_pay_to_receive_or_respond_to_leads',
    answer: 'do_i_have_to_pay_to_receive_or_respond_to_leads_answer',
  },
  {
    question: 'how_do_i_get_paid_for_my_gigs',
    answer: 'how_do_i_get_paid_for_my_gigs_answer',
  },
  {
    question: 'what_type_of_events_are_booked_on_gigsalad',
    answer: 'what_type_of_events_are_booked_on_gigsalad_answer',
  },
  {
    question: 'why_should_i_use_gigsalad_over_other_sites',
    answer: 'why_should_i_use_gigsalad_over_other_sites_answer',
  },
]
