import axios from 'axios'
import { Routes } from '../routes'

const instance = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
})

instance.interceptors.request.use((config: any) => {
  // Получаем токен из локального хранилища
  const token = localStorage.getItem('token')

  // Добавляем токен к заголовкам запроса
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 403) {
    }
    return Promise.reject(error)
  }
)

export default instance
