'use client'

import './globals.css'
import { LayoutHeader } from '../shared/ui/layout-header'
import { ReduxProvider } from '../store/provider'
import { NextAppDirEmotionCacheProvider } from 'tss-react/next/appDir'
import { styled } from '@mui/material'
import { AuthProvider } from '../shared/lib/auth-context'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const LayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 280,
    },
  }))

  const LayoutContainer = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    padding: '48px 12px 36px',
    width: '100%',
  })

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
