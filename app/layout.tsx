import type { Metadata } from 'next'
import { Noto_Sans_JP, DotGothic16 } from 'next/font/google'
import './globals.css'

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'], variable: '--font-noto' })
const dotGothic = DotGothic16({ weight: '400', subsets: ['latin'], variable: '--font-pixel' })

export const metadata: Metadata = {
  title: 'クエストウォーク | 沖縄・南城市の歩く冒険',
  description: '沖縄県南城市で毎月2回開催。6〜17kmの道のりを歩き、子供の体力・メンタル・感性を磨く「歩く冒険」です。',
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
