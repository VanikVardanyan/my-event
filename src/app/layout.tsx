import { Metadata } from 'next'

export const metadata: Metadata = {
  icons: {
    icon: '/logo/png/logo-color.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
