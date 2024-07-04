import axios from '@/shared/lib/axios'

export const ProfileApiRequest = {
  getUser: () => {
    return axios.get(`/api/user/me`)
  },
  getProfile: () => {
    return axios.get(`/api/profile`)
  },
}
