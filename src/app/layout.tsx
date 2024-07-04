import './globals.css'
import { LayoutHeader } from '../shared/ui/layout-header'
import { ReduxProvider } from '../store/provider'
import { NextAppDirEmotionCacheProvider } from 'tss-react/next/appDir'
import { styled } from '@mui/material'
import { AuthProvider } from '../shared/lib/auth-context'
import { Metadata } from 'next'
import { LayoutContainer, LayoutRoot } from './styles'

export const metadata: Metadata = {
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AuthProvider>
            <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
              <LayoutHeader />
              <LayoutRoot>
                <LayoutContainer>{children}</LayoutContainer>
              </LayoutRoot>
            </NextAppDirEmotionCacheProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
