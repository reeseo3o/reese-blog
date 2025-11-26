import { getPosts } from '@/lib/notion';
import HomeClient from '@/app/HomeClient';
import type { Metadata } from 'next';

export const revalidate = 1800;

export const metadata: Metadata = {
  title: 'Reese-log',
  description:
    '기록하고 나누며 함께 성장합니다. 작은 배움이 모여 만드는 임팩트를 믿습니다.',
  keywords: [
    '개발자 블로그',
    '프로덕트 개발',
    '사용자 경험',
    '기술 블로그',
    '프런트엔드',
    'Developer',
    'FE',
    'Frontend',
    'Frontend Developer',
    'Software Developer',
    'Software Engineer',
    'Web Developer',
    '웹 개발',
    'React',
    'Next.js',
    'TypeScript',
  ],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://reese-log.com',
    title: 'Reese-log - 기록하고 나누며 함께 성장합니다',
    description:
      '기록하고 나누며 함께 성장합니다. 작은 배움이 모여 만드는 임팩트를 믿습니다.',
    siteName: 'Reese-log',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Reese-log - 기록하고 나누며 함께 성장합니다',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reese-log - 기록하고 나누며 함께 성장합니다',
    description:
      '기록하고 나누며 함께 성장합니다. 작은 배움이 모여 만드는 임팩트를 믿습니다.',
    images: ['/images/og-image.png'],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://reese-log.com',
  },
};

export default async function HomePage() {
  const allPosts = await getPosts();
  const posts = allPosts.slice(0, 3);

  return <HomeClient posts={posts} projects={[]} />;
}

