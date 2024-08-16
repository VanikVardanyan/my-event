import { Routes } from '../routes'
import { Professions } from '../types/user.types'

import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import SearchIcon from '@mui/icons-material/Search'
import AssignmentIcon from '@mui/icons-material/Assignment'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
interface IService {
  name: Professions
  description: string
  image: string
  link: Routes
}

export const serviceListMock: IService[] = [
  {
    name: Professions.Showman,
    description: 'showman_description',
    image: '/main/showman.jpg',
    link: Routes.Showman,
  },
  {
    name: Professions.Photographers,
    description: 'photographers_description',
    image: '/main/photographer.jpg',
    link: Routes.Photographer,
  },
  {
    name: Professions.Musicians,
    description: 'musicians_description',
    image: '/main/musician.jpg',
    link: Routes.Musicians,
  },
  {
    name: Professions.Djs,
    description: 'djs_description',
    image: '/main/dj.jpg',
    link: Routes.Dj,
  },
  {
    name: Professions.Restaurants,
    description: 'restaurant_services_description',
    image: '/main/restaurant.jpg',
    link: Routes.Restaurants,
  },
  {
    name: Professions.CostumeRental,
    description: 'costume_rental_description',
    image: '/main/dress.jpg',
    link: Routes.CostumeRental,
  },
  {
    name: Professions.EquipmentRental,
    description: 'equipment_rental_description',
    image: '/main/equipment.jpg',
    link: Routes.EquipmentRental,
  },
  {
    name: Professions.floristsDecorators,
    description: 'florists_decorators_description',
    image: '/main/florist.jpg',
    link: Routes.FloristsDecorators,
  },
  {
    name: Professions.DancersEntertainers,
    description: 'dancers_entertainers_description',
    image: '/main/dance.jpg',
    link: Routes.DancersEntertainers,
  },
  {
    name: Professions.CarsRental,
    description: 'car_rental_description',
    image: '/main/car.jpg',
    link: Routes.CarsRental,
  },
  {
    name: Professions.Cake,
    description: 'cake_services_description',
    image: '/main/cakes.jpg',
    link: Routes.Cakes,
  },
]

export const workSteps = [
  {
    title: 'step1_title',
    description: 'step1_description',
    icon: <EventAvailableIcon style={{ width: 60, height: 60 }} color="info" />,
  },
  {
    title: 'step3_title',
    description: 'step3_description',
    icon: <ManageAccountsIcon style={{ width: 60, height: 60 }} color="info" />,
  },
  {
    title: 'step2_title',
    description: 'step2_description',
    icon: <SearchIcon style={{ width: 60, height: 60 }} color="info" />,
  },
  {
    title: 'step4_title',
    description: 'step4_description',
    icon: <FavoriteBorderIcon style={{ width: 60, height: 60 }} color="info" />,
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
