import { Routes } from '../routes'
import { Professions } from '../types/user.types'

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
