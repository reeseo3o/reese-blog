import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ThemeProvider from '@/components/providers/ThemeProvider';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://reese-log.com';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Reese-log',
      description: '기록하고 나누며 함께 성장합니다. 작은 배움이 모여 만드는 임팩트를 믿습니다.',
      inLanguage: 'ko-KR',
      publisher: {
        '@id': `${siteUrl}/#person`,
      },
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Reese',
      url: siteUrl,
      description: '프런트엔드 개발자',
      jobTitle: 'Frontend Developer',
      sameAs: [
        'https://github.com/reeseo3o',
        'https://x.com/nunnu099',
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Reese - Developer & Creator',
    template: '%s | Reese-log',
  },
  description: '개발자 Reese의 블로그와 프로젝트 포트폴리오',
  keywords: [
    '개발',
    '블로그',
    '포트폴리오',
    '프로젝트',
    '프런트엔드',
    '웹 개발',
    'React',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Three.js',
    '개발자',
  ],
  authors: [{ name: 'Reese' }],
  creator: 'Reese',
  publisher: 'Reese',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    images: [
      {
        url: '/images/og-image.png',
        secureUrl: new URL('/images/og-image.png', siteUrl).toString(),
        width: 1200,
        height: 630,
        alt: 'Reese - Developer & Creator',
      },
    ],
    url: siteUrl,
    title: 'Reese - Developer & Creator',
    description: `Frontend Developer Reese's Blog`,
    siteName: 'Reese Blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reese - Developer & Creator',
    description: `Frontend Developer Reese's Blog`,
    creator: '@reese',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    // 네이버 웹마스터 도구 인증 코드 (필요시 추가)
    // other: {
    //   'naver-site-verification': 'your-naver-verification-code',
    // },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
        <ThemeProvider>
          <Header />
          <main className="min-h-screen pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
