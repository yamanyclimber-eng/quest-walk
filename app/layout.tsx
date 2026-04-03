import type { Metadata } from 'next'
import { Noto_Sans_JP, DotGothic16 } from 'next/font/google'
import './globals.css'

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'], variable: '--font-noto' })
const dotGothic = DotGothic16({ weight: '400', subsets: ['latin'], variable: '--font-pixel' })

export const metadata: Metadata = {
  title: 'クエストウォーク | 親子で歩く15km',
  description: '月に2回開催される、親子で絆を深める15kmの山道ウォーキングイベント。',
}

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${notoSansJP.variable} ${dotGothic.variable}`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
