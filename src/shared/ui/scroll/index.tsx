'use client'

import { useEffect } from 'react'
import { usePathname } from '../../../navigation'

export default function Scroll() {
  // https://github.com/vercel/next.js/issues/45187

  // when clicking a link, user will not scroll to the top of the page if the header is sticky.

  // their current scroll position will persist to the next page.

  // this useEffect is a workaround to 'fix' that behavior.

  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return <></>
}
