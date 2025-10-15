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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://reese-blog.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Reese - Developer & Creator',
    template: '%s | Reese',
  },
  description: '개발자 Reese의 블로그와 프로젝트 포트폴리오',
  keywords: [
    '개발',
    '블로그',
    '포트폴리오',
    '프로젝트',
    '프론트엔드',
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
    description: '개발자 Reese의 블로그와 프로젝트 포트폴리오',
    siteName: 'Reese Blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reese - Developer & Creator',
    description: '개발자 Reese의 블로그와 프로젝트 포트폴리오',
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
