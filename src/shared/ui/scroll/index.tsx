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
    // var Tawk_API: any = Tawk_API || {},
    //   Tawk_LoadStart = new Date()
    // ;(function () {
    //   var s1 = document.createElement('script'),
    //     s0: any = document.getElementsByTagName('script')[0]
    //   s1.async = true
    //   s1.src = 'https://embed.tawk.to/66b3d0c51601a2195ba1efa2/1i4n6f1k3'
    //   s1.charset = 'UTF-8'
    //   s1.setAttribute('crossorigin', '*')
    //   s0.parentNode.insertBefore(s1, s0)
    // })()
    // window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return <></>
}
