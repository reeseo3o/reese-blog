import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Reese의 소개 페이지 입니다.',
  openGraph: {
    title: 'About - Reese',
    description: 'Reese의 소개 페이지 입니다.',
    type: 'profile',
    images: [
      {
        url: '/images/og-image.png',
        width: 1600,
        height: 900,
        alt: 'Reese About Open Graph Image',
      },
    ],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
