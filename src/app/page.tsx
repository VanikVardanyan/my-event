import { redirect } from 'next/navigation'
import { Languages } from '../shared/types/common'

export default function RootPage() {
  redirect(Languages.HY)
}
