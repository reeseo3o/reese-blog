import { getPosts } from '@/lib/notion';
import HomeClient from '@/app/HomeClient';
import type { Metadata } from 'next';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Reese-log',
  description:
    '프로덕트를 설계하고 구현합니다. 사용자 경험과 기술적 완성도, 두 가지를 모두 고민합니다.',
  keywords: [
    '개발자 블로그',
    '프로덕트 개발',
    '사용자 경험',
    '기술 블로그',
    '프론트엔드',
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
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://reese-blog.com',
    title: 'Reese-log - 프로덕트를 설계하고 구현합니다',
    description:
      '프로덕트를 설계하고 구현합니다. 사용자 경험과 기술적 완성도, 두 가지를 모두 고민합니다.',
    siteName: 'Reese-log',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Reese-log - 프로덕트를 설계하고 구현합니다',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reese-log - 프로덕트를 설계하고 구현합니다',
    description:
      '프로덕트를 설계하고 구현합니다. 사용자 경험과 기술적 완성도, 두 가지를 모두 고민합니다.',
    images: ['/images/og-image.png'],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://reese-blog.com',
  },
};

export default async function HomePage() {
  const allPosts = await getPosts();
  const posts = allPosts.slice(0, 3);

  return <HomeClient posts={posts} projects={[]} />;
}

