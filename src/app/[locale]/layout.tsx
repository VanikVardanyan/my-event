import './globals.css'
import { LayoutHeader } from '@/shared/ui/layout-header'
import { ReduxProvider } from '@/store/provider'
import { NextAppDirEmotionCacheProvider } from 'tss-react/next/appDir'
import { AuthProvider } from '@/shared/lib/auth-context'
import { Metadata } from 'next'
import { LayoutContainer, LayoutRoot } from './styles'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { unstable_setRequestLocale } from 'next-intl/server'

export const metadata: Metadata = {
  icons: {
    icon: '/logo.png',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
  params: {
    locale: string
  }
}

const locales = ['en', 're']

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function ({ children, params: { locale } }: Readonly<RootLayoutProps>) {
  // Providing all messages to the client
  // side is the easiest way to get started
  unstable_setRequestLocale(locale)
  const messages = await getMessages()
  console.log(locale, 'locale')
  return (
    <html lang={locale}>
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
