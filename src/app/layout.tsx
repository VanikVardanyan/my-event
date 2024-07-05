import './globals.css'
import { LayoutHeader } from '@/shared/ui/layout-header'
import { ReduxProvider } from '@/store/provider'
import { NextAppDirEmotionCacheProvider } from 'tss-react/next/appDir'
import { AuthProvider } from '@/shared/lib/auth-context'
import { Metadata } from 'next'
import { LayoutContainer, LayoutRoot } from './styles'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

export const metadata: Metadata = {
  icons: {
    icon: '/logo.png',
  },
}

export default async function ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang="en">
      <body>
        <NextIntlClientProvider messages={messages}>
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
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
