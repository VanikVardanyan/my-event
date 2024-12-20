import './globals.css'
import { LayoutHeader } from '@/shared/ui/layout-header'
import { ReduxProvider } from '@/store/provider'
import { NextAppDirEmotionCacheProvider } from 'tss-react/next/appDir'
import { AuthProvider } from '@/shared/lib/auth-context'
import { Metadata, Viewport } from 'next'
import { LayoutRoot } from './styles'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { unstable_setRequestLocale } from 'next-intl/server'
import { ToastContainer } from '@/shared/ui/toaster-container'
import Scroll from '@/shared/ui/scroll'
import Head from 'next/head'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Footer } from '@/shared/ui/footer'

const isProduction = process.env.NODE_ENV === 'production'

interface RootLayoutProps {
  children: React.ReactNode
  params: {
    locale: string
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  userScalable: false,
}

const locales = ['en', 're']

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function ({ children, params: { locale } }: Readonly<RootLayoutProps>) {
  unstable_setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&amp;subset=cyrillic"
          rel="stylesheet"
        />
        <link rel="icon" href="/logo/png/logo-color.png" />
      </Head>
      <body>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <NextIntlClientProvider messages={messages}>
            <ReduxProvider>
              <AuthProvider>
                <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
                  <LayoutHeader />
                  <Scroll />
                  <LayoutRoot id="layout">{children}</LayoutRoot>
                  <Footer />
                  <ToastContainer />
                </NextAppDirEmotionCacheProvider>
              </AuthProvider>
            </ReduxProvider>
          </NextIntlClientProvider>
        </div>
      </body>
      {isProduction && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4_ID || ''} />}
    </html>
  )
}
